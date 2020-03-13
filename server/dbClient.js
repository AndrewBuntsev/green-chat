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
    let client = await db.collection('clients').findOne({ clientId: clientId });

    mongoClient.close();
    return client;
};

exports.getClientBrief = async options => {
    const { clientId } = options;
    if (!clientId) {
        throw 'ClientId parameter is not provided';
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);
    let client = await db.collection('clients').find({ clientId: clientId }).limit(1).project({ clientId: 1, clientName: 1, _id: 0 }).next();

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

    const exists = await db.collection('clients').find({ clientId: clientId }).limit(1).count();
    if (exists) {
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

    const exists = await db.collection('clients').find({ clientId: clientId }).limit(1).count();
    if (!exists) {
        throw `Cannot add the contact to non-existent client.`;
    }

    await addContactIfNotExists(db, clientId, contact.clientId, contact.clientName);

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

    await db.collection('clients').updateOne({ clientId: clientId },
        {
            $pull: { contacts: { clientId: contactId } }
        });

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
        db.collection('clients').find({ clientId: searchRegex }).project({ clientId: 1, clientName: 1 }).toArray(),
        db.collection('clients').find({ clientName: searchRegex }).project({ clientId: 1, clientName: 1 }).toArray()]);

    mongoClient.close();
    // return list of unique clients (unique by clientId)
    return [...results[0], ...results[1]].filter((el, ind, arr) => arr.find(e => e.clientId == el.clientId) == el);
};

exports.sendMessage = async options => {
    const { senderId, receiverId, message } = options;
    if (!senderId) {
        throw `The senderId parameter is mandatory.`;
    }

    if (!receiverId) {
        throw `The receiverId parameter is mandatory.`;
    }

    if (!message) {
        throw `The message parameter is mandatory.`;
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    //TODO: try Promise.all
    await addMessage(db, senderId, receiverId, 'out', message);
    await addMessage(db, receiverId, senderId, 'in', message);

    mongoClient.close();
};





// ----------------------------------private functions-------------------------

addContactIfNotExists = async (db, clientId, contactId, contactName) => {
    // if the contact already exists, do nothing
    const exists = await db.collection('clients').find({ clientId: clientId, 'contacts.clientId': contactId }).limit(1).count();
    if (exists) return;

    // if no name provide it, retrieve it
    if (!contactName) {
        const contact = await db.collection('clients').find({ clientId: contactId }).limit(1).project({ clientId: 1, clientName: 1, _id: 0 }).next();
        contactName = contact.clientName;
    }

    // create the contact
    await db.collection('clients').updateOne(
        { clientId: clientId },
        {
            $push:
            {
                'contacts': { clientId: contactId, clientName: contactName }
            }
        });
};


addMessage = async (db, clientId, contactId, type, msg) => {
    // add contact if it doesn't exist
    await addContactIfNotExists(db, clientId, contactId, null);

    // add the message
    await db.collection('clients').updateOne(
        { clientId: clientId, 'contacts.clientId': contactId },
        {
            $push:
            {
                'contacts.$.messages': { type, msg }
            }
        });
};