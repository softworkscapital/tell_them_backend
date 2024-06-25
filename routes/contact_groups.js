const express = require('express');
const contactGroupsRouter = express.Router();
const ContactGroupsDbOperations = require('../cruds/contact_groups');

contactGroupsRouter.post('/', async (req, res, next) => { //group_id	contactid	clientid
    try {
        let postedValues = req.body;
        let group_id = postedValues.group_id; 
        let contactid = postedValues.contactid; 
        let clientid = postedValues.clientid;

        let results = await ContactGroupsDbOperations.postContactGroup(group_id, contactid, clientid);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

contactGroupsRouter.get('/', async (req, res, next) => {
    try {
        let results = await ContactGroupsDbOperations.getContactGroups();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contactGroupsRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await ContactGroupsDbOperations.getContactGroupById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//Get by client id
contactGroupsRouter.get('/contactgroups/:id/:grpid', async (req, res, next) => {
    try {
        let id = req.params.id;
        let grp_id = req.params.grpid;
        let result = await ContactGroupsDbOperations.getContactGroupByClientId(id,grp_id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contactGroupsRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let updatedValues = req.body;
      let name = updatedValues.name;
      let clientid = updatedValues.clientid;
      
      let result = await ContactGroupsDbOperations.updateContactGroup(
        id, name, clientid
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

contactGroupsRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await ContactGroupsDbOperations.deleteContactGroup(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = contactGroupsRouter;