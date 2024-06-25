require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postClient = (company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status, natureOfCom, purpose) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO self_registration(company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, signed_contract, status, nature_of_com, purpose) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status, natureOfCom, purpose], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ statu: '200', message: 'saving successful' });
        })
    })
};
crudsObj.getClients = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM self_registration ORDER BY registration_id DESC', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getClientById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM self_registration WHERE registration_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getRegIDById = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT registration_id FROM self_registration WHERE user_email = ? ORDER BY registration_id DESC LIMIT 1', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateClient = (registration_id, company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE self_registration SET company_name = ?, house_number_and_street_name = ?, surbub = ?, city = ?, country = ?, phoneno1 = ?, phoneno2 = ?, company_email = ?, payment_style = ?, username = ?, user_email = ?, password = ?, nation_id_image = ?, signed_contract = ?, status = ? WHERE registration_id = ?',
            [ company_name, house_number_and_street_name, surbub, city, country, phoneno1, phoneno2, company_email, payment_style, username, user_email, password, nation_id_image, pdf_file, status, registration_id],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

//Update Status
crudsObj.updateClientStatus = (registration_id, status) => {
    console.log(status);
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE self_registration SET status = ? WHERE registration_id = ?',[ status, registration_id],(err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

//Update Status
crudsObj.updateClientDocs = ( registration_id,email, pdf_file,proof_of_payment) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE self_registration SET signed_contract = ?, proof_of_payment = ? WHERE registration_id = ? AND user_email = ?',[ pdf_file, proof_of_payment, registration_id, email],(err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

crudsObj.deleteClient = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM self_registration WHERE registration_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;