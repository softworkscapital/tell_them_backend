const express = require('express');
const groupsRouter = express.Router();
const groupsDbOperations = require('../cruds/my_groups');

groupsRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let name = postedValues.name;
        let clientid = postedValues.client_id;
        let contactIDs = postedValues.contactIDs;

        let results = await groupsDbOperations.postGroup(name, clientid,contactIDs);
        console.log(contactIDs);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

groupsRouter.get('/', async (req, res, next) => {
    try {
        let results = await groupsDbOperations.getGroups();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
groupsRouter.get('/clients/:client_profile_id', async (req, res, next) => {
    try {
        let client_profile_id = req.params.client_profile_id;
        let results = await groupsDbOperations.getGroupsContact(client_profile_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

groupsRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await groupsDbOperations.getGroupById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//Get by client id
groupsRouter.get('/groups/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await groupsDbOperations.getGroupByClientId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

groupsRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let updatedValues = req.body;
      let name = updatedValues.name;
      let clientid = updatedValues.clientid;
      
      let result = await groupsDbOperations.updateGroup(
        id, name, clientid
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

groupsRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await groupsDbOperations.deleteGroup(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = groupsRouter;