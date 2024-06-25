const express = require('express');
const clientRouter = express.Router();
const clientDbOperations = require('../cruds/client_profile');

clientRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let account_type = postedValues.account_type;
        let account_category = postedValues.account_category;
        let signed_on = postedValues.signed_on;
        let name = postedValues.name;
        let street = postedValues.street;
        let surbub = postedValues.surbub;
        let city = postedValues.city;
        let country = postedValues.country;
        let phoneno1 = postedValues.phoneno1;
        let phoneno2 = postedValues.phoneno2;
        let email = postedValues.email;
        let status = postedValues.status;
        let payment_style = postedValues.payment_style;


        let results = await clientDbOperations.postClient(account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

clientRouter.get('/', async (req, res, next) => {
    try {
        let results = await clientDbOperations.getClients();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

clientRouter.get('/:id', async (req, res, next) => {
    try {
        let userId = req.params.id;
        let result = await clientDbOperations.getClientById(userId);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get client profile id by email
clientRouter.get('/clientid/:email', async (req, res, next) => {
    try {
        let email = req.params.email;
        let result = await clientDbOperations.getClientIDByEmail(email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get client profile id by apikey
clientRouter.get('/api/:id/:key', async (req, res, next) => {
    try {
        let id = req.params.id;
        let key = req.params.key;
        let result = await clientDbOperations.getClientByKey(id, key);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

clientRouter.put('/:id', async (req, res, next) => {
    try {
        let client_profile_id = req.params.id;
        let postedValues = req.body;
        let account_type = postedValues.account_type;
        let account_category = postedValues.account_category;
        let signed_on = postedValues.signed_on;
        let name = postedValues.name;
        let street = postedValues.street;
        let surbub = postedValues.surbub;
        let city = postedValues.city;
        let country = postedValues.country;
        let phoneno1 = postedValues.phoneno1;
        let phoneno2 = postedValues.phoneno2;
        let email = postedValues.email;
        let status = postedValues.status;
        let payment_style = postedValues.payment_style;

        let result = await clientDbOperations.updateClient(
            client_profile_id, account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

clientRouter.put('/configapi/:id', async (req, res, next) => {
    try {
        let client_profile_id = req.params.id;
        let postedValues = req.body;
        let apikey = postedValues.apiKey;
        let apikey_status = postedValues.status;

        let result = await clientDbOperations.configApikey(
            client_profile_id, apikey, apikey_status
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

clientRouter.put('/updateapisatus/:id', async (req, res, next) => {
    try {
        let client_profile_id = req.params.id;
        let postedValues = req.body;
        let apikey_status = postedValues.apikey_status;

        let result = await clientDbOperations.updateApiStatus(
            client_profile_id, apikey_status
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

clientRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await clientDbOperations.deleteClient(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = clientRouter;