require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postContact = (phone, email, client_id, contact_name, contact_surname) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO contacts(phone, email, client_id, contact_name, contact_surname) VALUES (?,?,?,?,?)', [phone, email, client_id, contact_name, contact_surname], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ statu: '200', message: 'saving successful' });
        })
    })
};
crudsObj.getContacts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contacts', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getContactById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contacts WHERE contact_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//get contact by client id
crudsObj.getContactByClientId = (client_profile_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contacts WHERE client_id = ?', [client_profile_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateContact = (id, contact_name, contact_surname, phone, email, client_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE contacts SET contact_name = ?, contact_surname = ?, phone = ?, email = ?, client_id = ? WHERE contact_id = ?',
            [contact_name, contact_surname, phone, email, client_id, id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

crudsObj.deleteContact = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM contacts WHERE contact_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;