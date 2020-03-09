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


module.exports = app => {
    testApi(app);
    getClient(app);
    addClient(app);
    searchClients(app);
};