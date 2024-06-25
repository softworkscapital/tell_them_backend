require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};
crudsObj.postMessage = (client_profile_id, message_type, origin_phone, dest_phone, date_sent, group_id, contact_grouping_id, msgbody, currency, exchange_rate, credit, debit, balance, description, vat, costIncl) => {
    return new Promise((resolve, reject) => {
      let recepient = "";
      let index = 0;
  
      function processNext() {
        if (index >= dest_phone.length) {
          return resolve({ status: '200', message: 'saving sucessful' });
        }
  
        recepient = dest_phone[index];
  
        console.log(recepient);
  
        pool.query('INSERT INTO messages_sent( message_type, origin_phone, dest_phone,group_id, contact_grouping_id, date_sent, msgbody, client_profile_id,vat,cost_incl) VALUES (?,?,?,?,?,?,?,?,?,?)', [message_type, origin_phone, recepient, group_id, contact_grouping_id, date_sent, msgbody, client_profile_id, vat, costIncl], (err, result) => {
          if (err) {
            return reject(err);
          }
          pool.query('SELECT balance FROM top_up WHERE client_profile_id = ? ORDER BY top_up_id DESC LIMIT 1', [client_profile_id], (err, results) => {
            if (err) {
              return reject(err);
            }
            console.log(results[0].balance);
            var cliBal = results[0].balance;
            var newBal = parseFloat(cliBal) - parseFloat(costIncl);
  
            pool.query('SELECT total_balance, total_usage FROM top_up ORDER BY top_up_id DESC LIMIT 1', (err, results) => {
              if (err) {
                return reject(err);
              }
  
              var getTotalBal = results[0].total_balance;
              var getTotalUsage = results[0].total_usage;
  
              var totalBal = parseFloat(getTotalBal) - parseFloat(costIncl);
              var totalUsage = parseFloat(getTotalUsage) + parseFloat(costIncl);
  
              pool.query('INSERT INTO top_up (currency, exchange_rate,date, debit,credit, balance,description, client_profile_id, total_balance, total_usage) VALUES (?,?,?,?,?,?,?,?,?,?)', [currency, exchange_rate, date_sent, debit, credit, newBal, description, client_profile_id, totalBal, totalUsage], (err, results) => {
  
                if (err) {
                  return reject(err);
                }
                index++;
                processNext();
              })
            })
          })
        })
      }
  
      processNext();
    })
  };

crudsObj.getMessages = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM messages_sent ORDER BY messages_sent_id DESC', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//JOINT MESSAGES
crudsObj.getMessagesByClients = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM messages_sent JOIN client_profile ON messages_sent.messages_sent_id = client_profile.client_profile_id JOIN my_groups ON messages_sent.group_id = my_groups.groupid ORDER BY messages_sent.messages_sent_id DESC;', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

// crudsObj.getMessagesByClients = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT *FROM messages_sent JOIN client_profile ON messages_sent.messages_sent_id = client_profile.client_profile_id ORDER BY messages_sent.messages_sent_id DESC;', (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(results);
//         })
//     })
// };

crudsObj.getMessageByClientId = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM messages_sent JOIN client_profile ON messages_sent.messages_sent_id = client_profile.client_profile_id JOIN my_groups ON messages_sent.group_id = my_groups.groupid ORDER BY messages_sent.messages_sent_id DESC;', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


crudsObj.getMessageById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM messages_sent WHERE client_profile_id = ? ORDER BY messages_sent_id DESC', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getMessageByClientId = (client_profile_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM messages_sent WHERE client_profile_id = ?', [client_profile_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateMessage = (id, name, clientid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE messages_sent SET client_id = ?, message_type = ?, origin_phone = ?, dest_phone = ?, date_sent = ?, group_id = ?, contact_grouping_id = ?, msgbody = ?, client_profile_id = ? WHERE messages_sent_id = ?',
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

crudsObj.deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM messages_sent WHERE messages_sent_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;

