const express = require('express');
const registrationRouter = express.Router();
const registrationDbOperations = require('../cruds/self_registration');

registrationRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let company_name = postedValues.company_name;
        let house_number_and_street_name = postedValues.house_number_and_street_name;
        let surbub = postedValues.surbub;
        let city = postedValues.city;
        let country = postedValues.country;
        let phoneno1 = postedValues.phoneno1;
        let phoneno2 = postedValues.phoneno2;
        let company_email = postedValues.company_email;
        let payment_style = postedValues.payment_style;
        let username = postedValues.username;
        let user_email = postedValues.user_email;
        let password = postedValues.passwordHash;
        let nation_id_image = postedValues.nation_id_image;
        let pdf_file = postedValues.pdf_file;
        let status = postedValues.status;
        let natureOfCom = postedValues.natureOfCom;
        let purpose = postedValues.purpose;

        let results = await registrationDbOperations.postClient(company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status, natureOfCom, purpose);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

registrationRouter.get('/', async (req, res, next) => {
    try {
        let results = await registrationDbOperations.getClients();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

registrationRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await registrationDbOperations.getClientById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

registrationRouter.get('/ref/:email', async (req, res, next) => {
    try {
        let email = req.params.email;
        let result = await registrationDbOperations.getRegIDById(email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

registrationRouter.put('/:id', async (req, res, next) => {
    try {
        let registration_id = req.params.id;
        let postedValues = req.body;
        let company_name = postedValues.company_name;
        let house_number_and_street_name = postedValues.house_number_and_street_name;
        let surbub = postedValues.surbub;
        let city = postedValues.city;
        let country = postedValues.country;
        let phoneno1 = postedValues.phoneno1;
        let phoneno2 = postedValues.phoneno2;
        let company_email = postedValues.company_email;
        let payment_style = postedValues.payment_style;
        let username = postedValues.username;
        let user_email = postedValues.user_email;
        let password = postedValues.password;
        let nation_id_image = postedValues.nation_id_image;
        let pdf_file = postedValues.pdf_file;
        let status = postedValues.status;
        let natureOfCom = postedValues.natureOfCom;
        let purpose = postedValues.purpose;

        let result = await registrationDbOperations.updateClient(
            registration_id, company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status, natureOfCom, purpose
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//Update Status
registrationRouter.put('/updatestatus/:id', async (req, res, next) => {
    try {
        let registration_id = req.params.id;
        let postedValues = req.body;
        let status = postedValues.status;

        let result = await registrationDbOperations.updateClientStatus(
            registration_id, status
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//Update Documents
registrationRouter.put('/uploaddocs/:id/:email', async (req, res, next) => {
    try {
        let registration_id = req.params.id;
        let email = req.params.email;
        let postedValues = req.body;
        let proof_of_payment = postedValues.proof_of_payment;
        let pdf_file = postedValues.pdf_file;

        let result = await registrationDbOperations.updateClientDocs(
            registration_id, email, pdf_file,proof_of_payment
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
// registrationRouter.put('/uploaddocs/:id', async (req, res, next) => {
//     try {
//         let registration_id = req.params.id;
//         let postedValues = req.body;
//         let proof_of_payment = postedValues.proof_of_payment;
//         let pdf_file = postedValues.pdf_file;

//         let result = await registrationDbOperations.updateClientDocs(
//             registration_id, pdf_file,proof_of_payment
//         );
//         res.json(result);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

registrationRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await registrationDbOperations.deleteClient(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = registrationRouter;