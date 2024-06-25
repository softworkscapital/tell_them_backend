require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postClient = ( account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status)=>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO client_profile(account_type, account_category, signed_on, name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, email, payment_style, membershipstatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status], (err, result)=>{
            if(err){
                return reject(err);
            }
            return resolve({statu:'200', message: 'saving successful'});
        })
    })
};
crudsObj.getClients = ()=>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM client_profile', (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getClientById = (userId) => {
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM client_profile WHERE client_profile_id = ?',[userId], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
  };
  
  // get client profile by email
  crudsObj.getClientIDByEmail = (email) => {
    return new Promise((resolve, reject)=>{
      pool.query('SELECT client_profile_id FROM client_profile WHERE email = ?',[email], (err, results)=>{
        if(err){
          return reject(err);
        }
        return resolve(results);
      })
    })
  };

  crudsObj.getClientByKey = (id, key) => {
      return new Promise((resolve, reject)=>{
          pool.query('SELECT * FROM client_profile WHERE client_profile_id = ? AND apikey = ?',[id, key], (err, results)=>{
              if(err){
                  return reject(err);
              }
              return resolve(results);
          })
      })
    };
  
  crudsObj.updateClient = ( client_profile_id, account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE client_profile SET account_type = ?, account_category = ?, signed_on = ?, name = ?, house_number_and_street_name = ?, surbub = ?, city = ?, country = ?, phoneno1 = ?, phoneno2 = ?, email = ?, payment_style = ?, membershipstatus = ? WHERE client_profile_id = ?',
        [ account_type, account_category, signed_on, name, street, surbub, city, country, phoneno1, phoneno2, email, payment_style, status, client_profile_id],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({ status: '200', message: 'update successful' });
        }
      );
    });
  };

  crudsObj.configApikey = ( client_profile_id, apikey, apikey_status) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE client_profile SET apikey = ?, apikey_status = ? WHERE client_profile_id = ?',
        [ apikey, apikey_status, client_profile_id],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({ status: '200', message: 'update successful' });
        }
      );
    });
  };

  crudsObj.updateApiStatus = ( client_profile_id, apikey_status) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE client_profile SET apikey_status = ? WHERE client_profile_id = ?',
        [ apikey_status, client_profile_id],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({ status: '200', message: 'update successful' });
        }
      );
    });
  };

  crudsObj.deleteClient = (id) => {
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM client_profile WHERE client_profile_id = ?',[id], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
  };


module.exports = crudsObj;