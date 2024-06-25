const express = require('express');
const userRouter = express.Router();
const usersDbOperations = require('../cruds/users');


userRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let company_id = postedValues.company_id;
        let branch_id = postedValues.branch_id;
        let username = postedValues.username;
        let password = postedValues.passwordHash;
        let role = postedValues.role;
        let category = postedValues.category;
        let email = postedValues.email;
        let notify = postedValues.notify;
        let activesession = postedValues.activesession;
        let addproperty = postedValues.addproperty;
        let editproperty = postedValues.editproperty;
        let approverequests = postedValues.approverequests;
        let delivery = postedValues.delivery;
        let status = postedValues.status;
        let employee_id = postedValues.employee_id;
        // let client_profile_id = postedValues.client_profile_id;

        console.log(email);

        let results = await usersDbOperations.postUser(company_id,branch_id,username,password,role,category,email,notify,activesession,addproperty,editproperty,approverequests,delivery,status,employee_id, client_profile_id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})
userRouter.post('/client/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let company_id = postedValues.company_id;
        let branch_id = postedValues.branch_id;
        let username = postedValues.username;
        let password = postedValues.password;
        let role = postedValues.role;
        let category = postedValues.category;
        let email = postedValues.user_email;
        let notify = postedValues.notify;
        let activesession = postedValues.activesession;
        let addproperty = postedValues.addproperty;
        let editproperty = postedValues.editproperty;
        let approverequests = postedValues.approverequests;
        let delivery = postedValues.delivery;
        let status = postedValues.status;
        let employee_id = postedValues.employee_id;
        let company_email = postedValues.company_email;
        let client_profile_id = postedValues.id;
        let user_phone = postedValues.phone;
        let otp = postedValues.otp;

        console.log(client_profile_id);

        let results = await usersDbOperations.postUser2(company_id,branch_id,username,password,role,category,email,notify,activesession,addproperty,editproperty,approverequests,delivery,status,employee_id, company_email, client_profile_id, user_phone,otp);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        let results = await usersDbOperations.getUsers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await usersDbOperations.getUserById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get User By User Credentials
userRouter.get('/:email/:password', async (req, res, next) => {
    try {
        let email = req.params.email;
        let password = req.params.password;
        let result = await usersDbOperations.getUserByCred(email,password);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get User By User Email
userRouter.get('/user/email/:email', async (req, res, next) => {
    try {
        let email = req.params.email;
        let result = await usersDbOperations.getUserByEmail(email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.get('/user/:email/:otp', async (req, res, next) => {
    try {
        let email = req.params.email;
        let otp = req.params.otp;
        let result = await usersDbOperations.getUserByOtp(email,otp);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Update OTP
userRouter.put('/updateopt/:id', async (req, res, next) => {
    try {
        let registration_id = req.params.id;
        let postedValues = req.body;
        let status = postedValues.otp;

        let result = await usersDbOperations.updateOTPStatus(
            registration_id, status
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Update OTP
userRouter.put('/updatepassword/:id', async (req, res, next) => {
    try {
        let userid = req.params.id;
        let postedValues = req.body;
        let password = postedValues.passwordHash;

        let result = await usersDbOperations.updatePasswordStatus(
            userid, password
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.put('/:id', async (req, res, next) => {
    try {
      let id = req.params.id;
      let updatedValues = req.body;
      let company_id = updatedValues.company_id;
        let branch_id = updatedValues.branch_id;
        let username = updatedValues.username;
        let password = updatedValues.password;
        let role = updatedValues.role;
        let category = updatedValues.category;
        let email = updatedValues.email;
        let notify = updatedValues.notify;
        let activesession = updatedValues.activesession;
        let addproperty = updatedValues.addproperty;
        let editproperty = updatedValues.editproperty;
        let approverequests = updatedValues.approverequests;
        let delivery = updatedValues.delivery;
        let status = updatedValues.status;
        let employee_id = updatedValues.employee_id;
  
      let result = await usersDbOperations.updateUser(
        id,company_id,branch_id,username,password,role,category,email,notify,activesession,addproperty,editproperty,approverequests,delivery,status,employee_id
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

userRouter.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await usersDbOperations.deleteUser(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = userRouter;