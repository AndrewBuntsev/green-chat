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
    if (!clientId) {
        throw `Cannot create a new client. The clientId parameter is mandatory.`;
    }
    if (!clientName) {
        throw `Cannot create a new client. The clientName parameter is mandatory. Client ID: ${clientId}`;
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    let client = await db.collection('clients').find({ clientId: clientId }).next();
    if (client) {
        throw `Cannot create a new client. The client ID ${clientId} already exists in the database`;
    }

    await db.collection('clients').insertOne({ clientId, clientName });
    mongoClient.close();
};

exports.addContact = async options => {
    const { clientId, contact } = options;
    if (!clientId) {
        throw `Cannot add the contact to non-existent client. The clientId parameter is mandatory.`;
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    let client = await db.collection('clients').find({ clientId: clientId }).next();
    if (!client) {
        throw `Cannot add the contact to non-existent client.`;
    }

    const contacts = client.contacts ? client.contacts : [];
    // don't duplicate contacts!
    if (contacts.every(c => c.clientId != contact.clientId)) {
        //if (clientId != contact.clientId)
        await db.collection('clients').updateOne({ clientId: clientId }, { $set: { contacts: [...contacts, contact] } });
    }

    mongoClient.close();
};

exports.removeContact = async options => {
    const { clientId, contactId } = options;
    if (!clientId) {
        throw `Cannot remove the contact from non-existent client. The clientId parameter is mandatory.`;
    }

    if (!contactId) {
        throw `Cannot remove the contact from the client {Clientid: ${clientId}}. The contactId parameter is mandatory.`;
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    let client = await db.collection('clients').find({ clientId: clientId }).next();
    if (!client) {
        throw `Cannot remove the contact from non-existent client.`;
    }

    const contacts = client.contacts ? client.contacts : [];
    await db.collection('clients').updateOne({ clientId: clientId }, { $set: { contacts: contacts.filter(c => c.clientId != contactId) } });

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