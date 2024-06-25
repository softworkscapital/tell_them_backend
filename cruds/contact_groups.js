require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postContactGroup = (group_id, contactid, clientid) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO contact_grouping(group_id, contactid, clientid) VALUES (?,?,?)', [group_id, contactid, clientid], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ statu: '200', message: 'saving successful' });
        })
    })
};

//JOINT CONTACT GROUP
// crudsObj.getJointContactGroups = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM my_groups JOIN contact_grouping ON my_groups.group_id = contact_grouping.group_id', (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         })
//     })
// };

crudsObj.getContactGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contact_grouping', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getContactGroupById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contact_grouping WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};
// crudsObj.getContactGroupByClientId = (id, group_id) => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT contact_grouping.*, contacts.phone FROM contact_grouping JOIN contacts ON contacts.contact_id = contact_grouping.contactid  WHERE (clientid = ? && group_id = ?)', [id, group_id], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         })
//     })
// };
crudsObj.getContactGroupByClientId = (id, group_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT phone FROM contacts WHERE contact_id IN ( SELECT contactid FROM contact_grouping WHERE clientid = ? AND group_id = ? )', [id, group_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


// crudsObj.getContactGroupByClientId = (id) => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM contact_grouping WHERE clientid = ?', [id], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         })
//     })
// };

// JOINT
// crudsObj.getContactGroupByClientId = (id) => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM contact_grouping WHERE clientid = ?', [id], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         })
//     })
// };

crudsObj.updateContactGroup = (id, name, clientid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE contact_grouping SET name = ?, clientid = ? WHERE id = ?',
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

crudsObj.deleteContactGroup = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM contact_grouping WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;