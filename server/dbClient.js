const MONGO_DB_NAME = 'GreenChat';
//const MONGO_URI = 'mongodb://username:password@server.andreibuntsev.com:27017/GreenChat';
const MONGO_URI = `mongodb://localhost:27017/${MONGO_DB_NAME}`;
const MongoClient = require('mongodb').MongoClient;
const MONGO_CLIENT_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };

//Refresh all the users data every ... sec
setInterval(refreshClientsData, 5000);

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

    await db.collection('clients').insertOne({ clientId, clientName, showNotifications: true, gender: '', status: 'on' });
    mongoClient.close();
};

exports.updateClient = async options => {
    const { clientId, clientName, showNotifications, gender, status } = options;
    if (!clientId) {
        throw `Cannot update the client. The clientId parameter is mandatory.`;
    }
    if (!clientName) {
        throw `Cannot update the client. The clientName parameter is mandatory. Client ID: ${clientId}`;
    }

    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    const exists = await db.collection('clients').find({ clientId: clientId }).limit(1).count();
    if (!exists) {
        throw `Cannot update the client. The client ID ${clientId} does not exist in the database`;
    }

    await db.collection('clients').updateOne({ clientId: clientId },
        {
            $set: { clientName, showNotifications, gender, status, isRefreshRequired: true }
        });

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

    await Promise.all([
        addMessage(db, senderId, receiverId, 'out', message),
        addMessage(db, receiverId, senderId, 'in', message)
    ]);

    mongoClient.close();
};





// ----------------------------------private functions-------------------------

const addContactIfNotExists = async (db, clientId, contactId, contactName) => {
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


const addMessage = async (db, clientId, contactId, type, msg) => {
    // add contact if it doesn't exist
    await addContactIfNotExists(db, clientId, contactId, null);

    // add the message
    await db.collection('clients').updateOne(
        { clientId: clientId, 'contacts.clientId': contactId },
        {
            $push:
            {
                'contacts.$.messages': { type, msg, time: new Date() }
            }
        });
};


async function refreshClientsData() {
    const mongoClient = await MongoClient.connect(MONGO_URI, MONGO_CLIENT_OPTIONS);
    const db = mongoClient.db(MONGO_DB_NAME);

    const clientsToRefresh = await db.collection('clients')
        .find({ isRefreshRequired: true })
        .toArray();

    await Promise.all(clientsToRefresh.map(client => db.collection('clients').updateOne({ clientId: client.clientId }, { $set: { isRefreshRequired: false } })));
    await Promise.all(clientsToRefresh.map(client =>
        Promise.all(client.contacts.map(contact =>
            db.collection('clients').updateOne(
                { clientId: contact.clientId, 'contacts.clientId': client.clientId },
                {
                    $set:
                    {
                        'contacts.$.clientName': client.clientName,
                        'contacts.$.gender': client.gender,
                        'contacts.$.status': client.status
                    }
                })
        ))));

    mongoClient.close();
};