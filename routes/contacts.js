const express = require('express');
const contactRouter = express.Router();
const contactDbOperations = require('../cruds/contacts');

contactRouter.post('/', async (req, res, next) => {
    try {

        let postedValues = req.body;
        let contact_name = postedValues.contact_name;
        let contact_surname = postedValues.surname;
        let phone = postedValues.phone;
        let email = postedValues.email;
        let client_id = postedValues.client_id;

        console.log(req.body);
        console.log(postedValues.phone);
        console.log(phone);

        let results = await contactDbOperations.postContact(phone,email,client_id,contact_name,contact_surname);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

contactRouter.get('/', async (req, res, next) => {
    try {
        let results = await contactDbOperations.getContacts();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contactRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await contactDbOperations.getContactById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
contactRouter.get('/contacts/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await contactDbOperations.getContactByClientId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contactRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let postedValues = req.body;
      let contact_name = postedValues.contact_name;
      let contact_surname = postedValues.contact_surname;
      let phone = postedValues.phone;
      let email = postedValues.email;
      let client_id = postedValues.client_id;
      let contact_id = postedValues.id;
      
      let result = await contactDbOperations.updateContact(
        id, contact_name, contact_surname, phone, email, client_id
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

contactRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await contactDbOperations.deleteContact(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = contactRouter;