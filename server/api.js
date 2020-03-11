const statusCodes = require('./const/statusCodes');
const dbClient = require('./dbClient');


const testApi = app => {
    app.get('/api/test', (req, res) => {
        res.status(200);
        res.json({ status: statusCodes.SUCCESS, message: '', payload: { hey: 'hello' } });
    });
};

const getClient = app => {
    app.get('/api/getClient', async (req, res) => {
        const { clientId } = req.query;
        try {
            const client = await dbClient.getClient({ clientId: clientId });
            if (client) {
                res.status(200);
                res.json({ status: statusCodes.SUCCESS, message: '', payload: client });
            } else {
                res.status(200);
                res.json({ status: statusCodes.SUCCESS, message: `Client with ID ${clientId} not found`, payload: null });
            }
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null })
        }
    });
};

const addClient = app => {
    app.post('/api/addClient', async (req, res) => {
        const { clientId, clientName } = req.body;
        try {
            await dbClient.addClient({ clientId, clientName });
            const client = await dbClient.getClient({ clientId: clientId });
            res.json({ status: statusCodes.SUCCESS, message: '', payload: client });
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null });
        }
    });
};

const addContact = app => {
    app.post('/api/addContact', async (req, res) => {
        const { clientId, contact } = req.body;
        try {
            await dbClient.addContact({ clientId, contact });
            const client = await dbClient.getClient({ clientId: clientId });
            res.json({ status: statusCodes.SUCCESS, message: '', payload: client });
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null });
        }
    });
};

const removeContact = app => {
    app.post('/api/removeContact', async (req, res) => {
        const { clientId, contactId } = req.body;
        try {
            await dbClient.removeContact({ clientId, contactId });
            const client = await dbClient.getClient({ clientId: clientId });
            res.json({ status: statusCodes.SUCCESS, message: '', payload: client });
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null });
        }
    });
};

const searchClients = app => {
    app.get('/api/searchClients', async (req, res) => {
        try {
            const clients = await dbClient.searchClients({ searchTerm: req.query.searchTerm });
            res.status(200);
            res.json({ status: statusCodes.SUCCESS, message: '', payload: clients });
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null })
        }
    });
};

const sendMessage = app => {
    app.post('/api/sendMessage', async (req, res) => {
        const { senderId, receiverId, message } = req.body;
        try {
            await dbClient.sendMessage({ senderId, receiverId, message });
            const client = await dbClient.getClient({ clientId: senderId });
            res.json({ status: statusCodes.SUCCESS, message: '', payload: client });
        }
        catch (err) {
            res.status(500);
            console.error(err);
            res.json({ status: statusCodes.ERROR, message: err, payload: null });
        }
    });
};

//TODO: add functions to swagger

module.exports = app => {
    testApi(app);
    getClient(app);
    addClient(app);
    addContact(app);
    removeContact(app);
    searchClients(app);
    sendMessage(app);
};