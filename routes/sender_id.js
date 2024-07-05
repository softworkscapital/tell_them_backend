const express = require('express');
const sendersRouter = express.Router();
const sendersDbOperations = require('../cruds/sender_id');

sendersRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let client_profile_id = postedValues.client_profile_id;
        let sender_name = postedValues.sender_name;
        let curDate = postedValues.curDate;

        let results = await sendersDbOperations.postSender(client_profile_id, sender_name, curDate);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

sendersRouter.get('/', async (req, res, next) => {
    try {
        let results = await sendersDbOperations.getSenders();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sendersRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await sendersDbOperations.getSenderById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sendersRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let updatedValues = req.body;
      let name = updatedValues.name;
      let clientid = updatedValues.clientid;
      
      let result = await sendersDbOperations.updateSender(
        id, name, clientid
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

sendersRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await sendersDbOperations.deleteSender(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = sendersRouter;