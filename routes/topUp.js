const express = require('express');
const topUpRouter = express.Router();
const topUpsDbOperations = require('../cruds/topUp');


//get topUps all
topUpRouter.get('/', async (req, res, next) => {

    try {
        let results = await topUpsDbOperations.getTopUp();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//get Admin Balance all
topUpRouter.get('/adminBal', async (req, res, next) => {

    try {
        let results = await topUpsDbOperations.getAdminBlance();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//get topUps by id
topUpRouter.get('/:top_up_id', async (req, res, next) => {

    try {
        let top_up_id = req.params.top_up_id;
        let results = await topUpsDbOperations.getTopUpById(top_up_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})
//get topUps by client_profile_id
topUpRouter.get('/topup/:client_profile_id', async (req, res, next) => {
    try {
        let client_profile_id = req.params.client_profile_id;
        let results = await topUpsDbOperations.getTopUpByClientId(client_profile_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//get last topup by client_profile_id
topUpRouter.get('/lasttopup/:client_profile_id', async (req, res, next) => {

    try {
        let client_profile_id = req.params.client_profile_id;
        let results = await topUpsDbOperations.getLastTopUpById(client_profile_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//post topUp
topUpRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let currency = postedValues.currency;
        let exchange_rate = postedValues.exchange_rate;
        let date = postedValues.date;
        let debit = postedValues.debit;
        let credit = postedValues.credit;
        let balance = postedValues.balance;
        let description = postedValues.description;
        let client_profile_id = postedValues.client_profile_id;
   
        console.log(req.body);

        let results = await topUpsDbOperations.postTopUp(currency,exchange_rate,date,debit,credit,balance,description,client_profile_id);
        res.json(results);

    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})

//update topUp by id
topUpRouter.put('/:id', async (req, res, next) => {
    try {
        let top_up_id = req.params.id;

        let postedValues = req.body;
        let currency = postedValues.currency;
        let exchange_rate = postedValues.exchange_rate;
        let amount = postedValues.amount;
        let balance = postedValues.balance;
        let description = postedValues.description;
        let client_profile_id = postedValues.client_profile_id;

        let results = await topUpsDbOperations.putTopUp(top_up_id,currency,exchange_rate,amount,balance,description,client_profile_id);
        res.json(results);
        console.log(e);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})


//delete topUp by id
topUpRouter.delete('/:top_up_id', async (req, res, next) => {

    try {
        let top_up_id = req.params.top_up_id;
        let results = await topUpsDbOperations.deleteTopUpById(top_up_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = topUpRouter;