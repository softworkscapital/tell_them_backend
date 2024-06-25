const express = require('express');
const mailerRouter = express.Router();
const mailerDbOperations = require('../cruds/mailer');

// mailerRouter.get('/', async (req, res, next) => {
//     try {
//         let results = await mailerDbOperations.sendEmailAndAppend();
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

mailerRouter.post('/', async (req, res, next) => {
    let postedValues = req.body;
    let username = postedValues.username;
    let user_email = postedValues.user_email;
    let ref = postedValues.ref;
    
    try {
        let results = await mailerDbOperations.sendEmailAndAppend(username, user_email, ref );
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

mailerRouter.post('/appform', async (req, res, next) => {  
    let postedValues = req.body;
    let company_name = postedValues.company_name;
    let address = postedValues.address;
    let phoneno1 = postedValues.phoneno1;
    let phoneno2 = postedValues.phoneno2;
    let company_email = postedValues.company_email;
    let payment_style = postedValues.payment_style;
    let username = postedValues.username;
    let user_email = postedValues.user_email;
    let ref = postedValues.ref;
    
    try {
        let results = await mailerDbOperations.sendEmailAndAppend2(company_name, address, phoneno1, phoneno2, company_email, payment_style, username, user_email, ref);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = mailerRouter;