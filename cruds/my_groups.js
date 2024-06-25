require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

// crudsObj.postGroup = (name, clientid, contactIDs) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO my_groups(grp_name, clientid) VALUES (?,?)', [name, clientid], (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             for (i = 0; i < contactIDs.length; i++) {
//                 contactID = contactIDs[i]
//                 console.log("Contact id: " + contactID)
//                 pool.query('SELECT groupid FROM my_groups WHERE (clientid = ? && grp_name = ?) ORDER BY groupid DESC LIMIT 1', [clientid, name], (err, results) => {
//                     if (err) {
//                         return reject(err);
//                     }
//                     var grp_id = results[0].groupid;
//                     pool.query('INSERT INTO contact_grouping(group_id, contactid, clientid) VALUES (?,?,?)', [grp_id, contactID, clientid], (err, result) => {
//                         if (err) {
//                             return reject(err);
//                         }
//                         return resolve({ statu: '200', message: 'saving successful' });
//                     })
//                 })
//             }
//         })
//     })
// };

// crudsObj.postGroup = async (name, clientid, contactIDs) => {
//     try {
//       await pool.query('INSERT INTO my_groups(grp_name, clientid) VALUES (?,?)', [name, clientid]);
//       const results = await pool.query('SELECT groupid FROM my_groups WHERE (clientid = ? AND grp_name = ?) ORDER BY groupid DESC LIMIT 1', [clientid, name]);
//       if (results.length > 0) {
//         const grp_id = results[0].groupid;
//         for (let i = 0; i < contactIDs.length; i++) {
//           const contactID = contactIDs[i];
//           await pool.query('INSERT INTO contact_grouping(group_id, contactid, clientid) VALUES (?,?,?)', [grp_id, contactID, clientid]);
//         }
//         return { status: '200', message: 'saving successful' };
//       } else {
//         throw new Error('No groupid found for the given clientid and grp_name');
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

crudsObj.postGroup = (name, clientid, contactIDs) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO my_groups(grp_name, clientid) VALUES (?,?)', [name, clientid], (err, result) => {
        if (err) {
          return reject(err);
        }
  
        pool.query('SELECT groupid FROM my_groups WHERE (clientid = ? AND grp_name = ?) ORDER BY groupid DESC LIMIT 1', [clientid, name], (err, results) => {
          if (err) {
            return reject(err);
          }
  
          if (results.length > 0) {
            const grp_id = results[0].groupid;
            const promises = contactIDs.map((contactID) => {
              return new Promise((resolve, reject) => {
                pool.query('INSERT INTO contact_grouping(group_id, contactid, clientid) VALUES (?,?,?)', [grp_id, contactID, clientid], (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              });
            });
  
            Promise.all(promises)
              .then(() => {
                resolve({ status: '200', message: 'saving successful' });
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject(new Error('No groupid found for the given clientid and grp_name'));
          }
        });
      });
    });
  };


crudsObj.getGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM my_groups', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//Client Groups contct
crudsObj.getGroupsContact = (client_profile_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT my_groups.groupid, my_groups.grp_name, contact_grouping.group_id AS GroupingGroup, contacts.phone, contacts.contact_name FROM `my_groups` JOIN contact_grouping ON contact_grouping.group_id = my_groups.groupid JOIN contacts ON contacts.contact_id = contact_grouping.contactid WHERE my_groups.clientid = ?',[client_profile_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


crudsObj.getContactGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM my_groups', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getGroupById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM my_groups WHERE groupid = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};
crudsObj.getGroupByClientId = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM my_groups WHERE clientid = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateGroup = (id, name, clientid) => {
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

crudsObj.deleteGroup = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM my_groups WHERE groupid = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;