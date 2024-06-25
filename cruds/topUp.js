require('dotenv').config();

const pool = require('./poolfile')
let crudsObj = {};

//crud get TopUps all
crudsObj.getTopUp = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM top_up ORDER BY top_up_id DESC', (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve({ results })

        })
    })
}

//crud get admin bal
crudsObj.getAdminBlance = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT total_balance, total_usage FROM top_up ORDER BY top_up_id DESC LIMIT 1', (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve({ results })

        })
    })
}

//crud get top up by id
crudsObj.getTopUpById = (top_up_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM top_up WHERE top_up_id =?', [top_up_id], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve(results)

        })
    })
}
//crud get top up by client_id
crudsObj.getTopUpByClientId = (client_profile_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM top_up WHERE client_profile_id = ? ORDER BY top_up_id DESC;', [client_profile_id], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve(results)

        })
    })
}

// get last topUp by client profile id
crudsObj.getLastTopUpById = (client_profile_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT balance FROM top_up WHERE client_profile_id =? ORDER BY top_up_id DESC LIMIT 1', [client_profile_id], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve({ results })

        })
    })
}



//crud post TopUp 
crudsObj.postTopUp = (currency, exchange_rate, date, debit, credit, balance, description, client_profile_id) => {

    return new Promise((resolve, reject) => {
        //Get Total Balance
        pool.query('SELECT total_balance, total_usage FROM top_up ORDER BY top_up_id DESC LIMIT 1', (err, results) => {
            if (err) {
                return reject(err);
            }
            var getTotalBal = results[0].total_balance;
            var getTotalUsage = results[0].total_usage;
            var totalBal = parseFloat(getTotalBal) + parseFloat(debit);

            pool.query('INSERT INTO top_up (currency,exchange_rate,date,debit,credit,balance,description,client_profile_id,total_balance,total_usage) VALUES (?,?,?,?,?,?,?,?,?,?)', [currency, exchange_rate, date, debit, credit, balance, description, client_profile_id, totalBal, getTotalUsage], (err, results) => {

                if (err) {
                    return reject(err);
                }
                return resolve([{ status: '200', message: 'saving sucessful' }])

            })
        })
    })
}

//crud put TopUp 
crudsObj.putTopUp = (top_up_id, currency, exchange_rate, amount, balance, description, client_profile_id) => {

    return new Promise((resolve, reject) => {
        pool.query('UPDATE top_up SET currency=?, exchange_rate=?, amount=?, balance=?,description=?, client_profile_id=? WHERE top_up_id=?', [currency, exchange_rate, amount, balance, description, client_profile_id, top_up_id], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve({ status: '200', message: 'saving sucessful' })

        })
    })
}

//crud delete TopUps by id
crudsObj.deleteTopUpById = (top_up_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM top_up WHERE top_up_id =?', [top_up_id], (err, results) => {

            if (err) {
                return reject(err);
            }
            return resolve({ results })

        })
    })
}

module.exports = crudsObj;