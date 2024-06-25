const express = require('express');
const sentMessagesRouter = express.Router();
const sentMessagesDbOperations = require('../cruds/sent_messages');

sentMessagesRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let client_profile_id = postedValues.client_profile_id;
        let message_type = postedValues.message_type;
        let origin_phone = postedValues.origin_phone;
        let dest_phone = postedValues.arr;
        let date_sent = postedValues.date_sent;
        let group_id = postedValues.group_id;
        let contact_grouping_id = postedValues.contact_grouping_id;
        let msgbody = postedValues.msgbody;
   

        let currency = postedValues.currency;
        let exchange_rate = postedValues.exchange_rate;
        let date = postedValues.date;
        let debit = postedValues.debit;
        let credit = postedValues.credit;
        let balance = postedValues.balance;
        let description = postedValues.description;
        let vat = postedValues.vat;
        let costIncl = postedValues.costIncl

        let results = await sentMessagesDbOperations.postMessage(client_profile_id, message_type, origin_phone, dest_phone, date_sent, group_id, contact_grouping_id, msgbody, currency, exchange_rate, credit, debit, balance, description,vat,costIncl);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

sentMessagesRouter.get('/', async (req, res, next) => {
    try {
        let results = await sentMessagesDbOperations.getMessages();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//JOINT MESSAGES
// sentMessagesRouter.get('/messages', async (req, res, next) => {
//     try {
//         let results = await sentMessagesDbOperations.getMessagesByClients();
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

sentMessagesRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await sentMessagesDbOperations.getMessageById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Check
// sentMessagesRouter.get('/messages/:id', async (req, res, next) => {
//     try {
//         let id = req.params.id;
//         let result = await sentMessagesDbOperations.getMessageByClientId(id);
//         res.json(result);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

sentMessagesRouter.get('/messages/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await sentMessagesDbOperations.getMessageById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//To be updated
sentMessagesRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let updatedValues = req.body;
      let name = updatedValues.name;
      let clientid = updatedValues.clientid;
      
      let result = await sentMessagesDbOperations.updateMessage(
        id, name, clientid
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

sentMessagesRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await sentMessagesDbOperations.deleteMessage(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = sentMessagesRouter;