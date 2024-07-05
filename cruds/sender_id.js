require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postSender = (client_profile_id, sender_name, curDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO sender(client_profile_id, sender_name, date_created) VALUES (?,?,?)', [client_profile_id, sender_name, curDate], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ statu: '200', message: 'saving successful' });
        })
    })
};


crudsObj.getSenders = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM sender', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getSenderById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM sender WHERE (client_profile_id = ? OR client_profile_id = 0)', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};
crudsObj.getSenderByClientId = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM my_groups WHERE clientid = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateSender = (id, name, clientid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE my_groups SET name = ?, clientid = ? WHERE groupid = ?',
            [name, clientid, id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

crudsObj.deleteSender = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM sender WHERE sender_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;