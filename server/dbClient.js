const MONGO_DB_NAME = 'GreenChat';
//const MONGO_URI = 'mongodb://username:password@server.andreibuntsev.com:27017/GreenChat';
const MONGO_URI = `mongodb://localhost:27017/${MONGO_DB_NAME}`;
const MongoClient = require('mongodb').MongoClient;
const MONGO_CLIENT_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };


exports.getClient = async options => {
    const { clientId } = options;
    if (!clientId) {
        throw 'ClientId parameter is not provided';
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);
    let client = await db.collection('clients').find({ clientId: clientId }).next();

    mongoClient.close();
    return client;
};

exports.addClient = async options => {
    const { clientId, clientName } = options;
    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);
    if (clientId) {
        let client = await db.collection('clients').find({ clientId: clientId }).next();
        if (client) {
            throw `Cannot create a new client. The client ID ${clientId} already exists in the database`;
        }
    }

    if (!clientName) {
        throw `Cannot create a new client. The clientName parameter is mandatory. Client ID: ${clientId}`;
    }

    await db.collection('clients').insertOne({ clientId, clientName });
    mongoClient.close();
};

exports.searchClients = async options => {
    const { searchTerm } = options;
    if (!searchTerm) {
        throw 'searchTerm parameter is not provided';
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    const searchRegex = new RegExp(searchTerm);
    const results = await Promise.all([
        db.collection('clients').find({ clientId: searchRegex }).project({ _id: 0 }).toArray(),
        db.collection('clients').find({ clientName: searchRegex }).project({ _id: 0 }).toArray()]);

    mongoClient.close();
    // return list of unique clients (unique by clientId)
    return [...results[0], ...results[1]].filter((el, ind, arr) => arr.find(e => e.clientId == el.clientId) == el);
};