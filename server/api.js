const dbClient = require('./dbClient');

const testApi = app => {
    app.get('/api/test', (req, res) => {
        res.status(200);
        res.json({ status: 'SUCCESS', message: '', payload: { hey: 'hello' } });
    });
};

const getClient = app => {
    app.get('/api/getClient', async (req, res) => {
        const { clientId } = req.query;
        try {
            const client = await dbClient.getClient({ clientId: clientId });
            if (client) {
                res.status(200);
                res.json({ status: 'SUCCESS', message: '', payload: client });
            } else {
                res.status(200);
                res.json({ status: 'SUCCESS', message: `Client with ID ${clientId} not found`, payload: null });
            }
        }
        catch (err) {
            res.status(500);
            res.json({ status: 'ERROR', message: err, payload: null });
        }
    });
};

const addClient = app => {
    app.post('/api/addClient', async (req, res) => {
        const { clientId, clientName } = req.body;
        try {
            await dbClient.addClient({ clientId, clientName });
        }
        catch (err) {
            res.status(500);
            res.json({ status: 'ERROR', message: err, payload: null });
        }
    });
};


module.exports = app => {
    testApi(app);
    getClient(app);
    addClient(app);
};