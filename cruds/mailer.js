require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

const axios = require('axios');

const nodemailer = require('nodemailer');
const Imap = require('imap');
const { simpleParser } = require('mailparser');

// Email configuration
//User info
// const username = "Takudzwa";
// const ref = '197';

const companyName = "Softworks";
const senderEmail = 'info@softworkscapital.com';
const senderPassword = 'admin12345*';
// const recipientEmail = 'taku1muvhawa@gmail.com';
const subject = 'Welcome to Tell Them Message Service';
// const body = `<h2 style='color: blue;'> Tell Them Message Service  </h2> <p style = ' color: #000000; margin-top: 33px;'> Good Day ${username}.</p> <p style = ' color: #000000;'><br><br>We are very excited to welcome you onboard on Tell Them Message Service sending service. Tell Them Message Service sending service is a member of our group of software products for our full proof solutions of our ERP business products known as REMS Business Suite.. We are excited to welcome you on a new journey of using our services. With the services you will be able to streamline your communication and reach your audience with ease. Whether you're a large small or medium sized business looking to connect with customers for promotions notifications or reminders or an individual wanting to stay in touch with friends and family, we've got you covered. Thank you for choosing us as your messaging partner - we're excited to help you get started and see the value our platform can bring to your communication needs!.</p><p style= 'font-weight: bold; font-size: 25px'>Your Ref: ${ref} </p><p style = ' margin-top: 25px'><b>Regards</b><br></br><b>Softworks Team</b><br></br>0773406449, 0777304942<br></br>30 Samora Machel Avenue<br></br>Harare CBD<br></br></p><p style = 'color: #1fc600'><em>We are Your Technology Partner for Digital Success.</em></p>`;
// const body = `<!DOCTYPE html><html><head><title>User Sign-in Form</title><style>body{font-family:Arial,sans-serif;}.form-section{margin-top:10px;padding:10px;background-color:#fff;}.form-label{font-size:12px;font-weight:bold;margin-bottom:5px;color:#000 !important;}.form-input{font-size:12px;padding:5px;border:1px solid black;border-radius:5px;width:100%;}.form-signature{font-size:18px;font-weight:bold;text-decoration:underline;margin-bottom:10px;color:#000 !important;}.form-consent{font-size:12px;margin-bottom:10px;color:#000 !important;}.form-signature-line{font-size:12px;margin-top:10px;color:#000 !important;}</style></head><body><h1 style="color:#000 !important;">Tell Them SMS Gateway Application Form</h1><div class="form-section"><h2 style="color:#000 !important;">Company Information</h2><label class="form-label" for="company_name">Company Name:</label><input class="form-input" type="text" id="company_name" value="${companyName}" name="company_name" required><label class="form-label" for="address">Address:</label><input class="form-input" type="text" id="address" name="address" required><label class="form-label" for="phoneno1">Phone No. 1:</label><input class="form-input" type="text" id="phoneno1" name="phoneno1" required><label class="form-label" for="phoneno2">Phone No. 2:</label><input class="form-input" type="text" id="phoneno2" name="phoneno2" required><label class="form-label" for="company_email">Company Email:</label><input class="form-input" type="email" id="company_email" name="company_email" required><label class="form-label" for="payment_style">Payment Style:</label><input class="form-input" type="text" id="payment_style" name="payment_style" required></div><div class="form-section"><h2 style="color:#000 !important;">User Information</h2><label class="form-label" for="username">Username:</label><input class="form-input" type="text" id="username" name="username" required><label class="form-label" for="user_email">User Email:</label><input class="form-input" type="email" id="user_email" name="user_email" required></div><div class="form-section"><h2 style="color:#000 !important;">Contract Details</h2><label class="form-signature">Date:</label>____________________________________________ <br/><br/><label class="form-consent" style="font-size:14px;">I have read and understood the terms and conditions of this contract:</label> <br/><br/>Signature:  ____________________________________________ <br/><br/></div></body></html>`;
const bodyApplicationForm = '';

// SMTP (sending) server details
const smtpServer = 'smtp.titan.email';
const smtpPort = 587;

// IMAP (receiving) server details
const imapServer = 'imap.titan.email';
const imapPort = 993;


crudsObj.sendEmailAndAppend = (username, user_email, ref ) => {
    return new Promise((resolve, reject) => {
    const body = `<h2 style='color: blue;'> Tell Them Message Service  </h2> <p style = ' color: #000000; margin-top: 33px;'> Good Day ${username}.</p> <p style = ' color: #000000; textAlign: justify '><br><br>We are very excited to welcome you onboard on our Tell Them Message Service gateway. Tell Them Message Service is a member of our group of software products, of our full proof solutions of our ERP business products known as REMS Business Suite. We are excited to welcome you on a new journey of using our services. With our services you will be able to streamline your communication and reach your audience with ease. Whether you're a large small or medium sized business looking to connect with customers for promotions notifications or reminders or an individual wanting to stay in touch with friends and family, we've got you covered. Thank you for choosing us as your messaging partner - we're excited to help you get started and see the value our platform can bring to your communication needs ! \n \n Kindly fill in the application form in the next email </p><p style= 'font-weight: bold; font-size: 25px'>Your Ref: ${ref} </p><p style = ' margin-top: 25px'><b>Regards</b><br></br><b>Softworks Team</b><br></br>0773406449, 0777304942<br></br> www.softworkscapital.com <br/> Bonvyx Company Pvt Ltd t/a softworks <br/>30 Samora Machel Avenue<br></br>Harare CBD<br></br></p><p style = 'color: #1fc600'><em>We are Your Technology Partner for Digital Success.</em></p>`;

    try {
        // Create a nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: smtpServer,
            port: smtpPort,
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
        });

        // Create the email options
        const mailOptions = {
            from: senderEmail,
            to: user_email,
            subject: subject,
            html: body,
        };


        // Send the email
        const info = transporter.sendMail(mailOptions);

        console.log('Email sent successfully.');
        console.log('Info object:', info);

        // Append the sent email to the "Sent" folder using IMAP
        const imap = new Imap({
            user: senderEmail,
            password: senderPassword,
            host: imapServer,
            port: imapPort,
            tls: true,
        });

        imap.once('ready', () => {
            imap.openBox('Sent', true, (err) => {
                if (err) {
                    console.error('Error opening "Sent" folder:', err);
                    imap.end();
                    return reject(err);
                    return;
                }

                // Create the email message as MIMEText
                const emailMessage = `From: ${senderEmail}\r\nTo: ${user_email}\r\nSubject: ${subject}\r\n\r\n${body}`;

                // Append the sent email to the "Sent" folder
                imap.append(emailMessage, { mailbox: 'Sent' }, (appendErr) => {
                    if (appendErr) {
                        console.error('Error appending email to "Sent" folder:', appendErr);
                        return reject(err);
                    } else {
                        console.log('Email appended to "Sent" folder.');
                        resolve({ status: '200', message: 'sent successfully' });
                        imap.end();
                        return
                    }
                    imap.end();
                });
            });
        });

        imap.once('error', (imapErr) => {
            console.error('IMAP Error:', imapErr);
            return reject(err);
        });

        imap.connect();
    } catch (error) {
        console.error('Error sending email:', error);
        return reject(err);
    }
});
}

crudsObj.sendEmailAndAppend2 = (company_name, address, phoneno1, phoneno2, company_email, payment_style, username, user_email,ref) => {
    return new Promise((resolve, reject) => {
    // const body = `<!DOCTYPE html><html><head><title>User Sign-in Form</title><style>body{font-family:Arial,sans-serif;}.form-section{margin-top:10px;padding:10px;background-color:#fff;}.form-label{font-size:12px;font-weight:bold;margin-bottom:5px;color:#000 !important;}.form-input{font-size:12px;padding:5px;border:1px solid black;border-radius:5px;width:100%;}.form-signature{font-size:18px;font-weight:bold;text-decoration:underline;margin-bottom:10px;color:#000 !important;}.form-consent{font-size:12px;margin-bottom:10px;color:#000 !important;}.form-signature-line{font-size:12px;margin-top:10px;color:#000 !important;}</style></head><body><div class="row"><div class"col-md-12 col-sm-12 col-xs-12"><div class"col-md-8 col-sm-8 col-xs-8 style='width:80%' "><h1 style='color: blue;'>Tell Them Message Service</h1>Application Form<p><h2 style="float: right; color:#949393 ">Reference: ${ref}</h2><h2 style="color:#000 !important;">Company Information </h2><label class="form-label" for="company_name">Company Name:</label><input class="form-input" type="text" id="company_name" value="${company_name}" name="company_name" required><label class="form-label" for="address">Address:</label><input class="form-input" type="text" id="address" name="address" value="${address}" required><label class="form-label" for="phoneno1">Phone No. 1:</label><input class="form-input" type="text" id="phoneno1" name="phoneno1" value="${phoneno1}" required><label class="form-label" for="phoneno2">Phone No. 2:</label><input class="form-input" type="text" id="phoneno2" name="phoneno2" value="${phoneno2}"><label class="form-label" for="company_email">Company Email:</label><input class="form-input" type="email" id="company_email" name="company_email" value="${company_email}" required><label class="form-label" for="payment_style">Payment Style:</label><input class="form-input" type="text" id="payment_style" name="payment_style" value=${payment_style} required></p><p><h2 style="color:#000 !important;">User Information</h2><label class="form-label" for="username">Username:</label><input class="form-input" type="text" id="username" name="username" value="${username}" required><label class="form-label" for="user_email">User Email:</label><input class="form-input" type="email" id="user_email" name="user_email" value="${user_email}" required></p><p><h2 style="color:#000 !important;">Declaration</h2><label class="form-consent" style="font-size:14px;">I/We _______________________ ______________________ do hereby declare that I am the authorised representative of thus named entity. I/We hereby consciously apply for the services of using the Tell Them Message Service gateway and to be bound by the terms and conditions of the use of the service</label> <br/><br/> Full Names: ___________________________   ___________________________     ID: ________________________ <br/> <br/> Date: _______________________________     Signature: _______________________________________________ <br/><br/></p></div><div class"col-md-4 col-sm-4 col-xs-4"><p style = ' margin-top: 25px'><b>Client Services</b><br></br><b>Softworks Team</b><br></br>0773406449, 0777304942<br></br>Bonvyx Company Pvt Ltd t/a softworks <br></br>30 Samora Machel Avenue<br></br>Harare CBD<br></br></p><p style = 'color: #1fc600'><em>We are Your Technology Partner for Digital Success.</em></p></div></div></body></html>`;
    // const body = `<!DOCTYPE html><html><head><title>User Sign-in Form</title><style>body{font-family:Arial,sans-serif;}.form-section{margin-top:10px;padding:10px;background-color:#fff;}.form-label{font-size:12px;font-weight:bold;margin-bottom:5px;color:#000 !important;}.form-input{font-size:12px;padding:5px;border:1px solid black;border-radius:5px;width:100%;}.form-signature{font-size:18px;font-weight:bold;text-decoration:underline;margin-bottom:10px;color:#000 !important;}.form-consent{font-size:12px;margin-bottom:10px;color:#000 !important;}.form-signature-line{font-size:12px;margin-top:10px;color:#000 !important;}</style></head><body><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="col-md-8 col-sm-8 col-xs-8" style='width:80%'><h1 style='color: blue;'>Tell Them Message Service</h1>Application Form<p><h2 style="float: right; color:#949393 ">Reference: ${ref}</h2><table><tr><th>Company Information</th><th></th></tr><tr><td>Company Name:</td><td>${company_name}</td></tr><tr><td>Address:</td><td>${address}</td></tr><tr><td>Phone No. 1:</td><td>${phoneno1}</td></tr><tr><td>Phone No. 2:</td><td>${phoneno2}</td></tr><tr><td>Company Email:</td><td>${company_email}</td></tr><tr><td>Payment Style:</td><td>${payment_style}</td></tr></table><br/><table><tr><th>User Information</th><th></th></tr><tr><td>Username:</td><td>${username}</td></tr><tr><td>User Email:</td><td>${user_email}</td></tr></table><p><h2 style="color:#000 !important;">Declaration</h2><label class="form-consent" style="font-size:14px;">I/We _______________________ ______________________ do hereby declare that I am the authorised representative of thus named entity. I/We hereby consciously apply for the services of using the Tell Them Message Service gateway and to be bound by the terms and conditions of the use of the service</label> <br/><br/> Full Names: ___________________________   ___________________________     ID: ________________________ <br/> <br/> Date: _______________________________     Signature: _______________________________________________ <br/><br/></p></div><div class="col-md-4 col-sm-4 col-xs-4"><p style = ' margin-top: 25px'><b>Client Services</b><br></br><b>Softworks Team</b><br></br>0773406449, 0777304942<br></br> www.softworkscapital.com \n Bonvyx Company Pvt Ltd t/a softworks <br></br>30 Samora Machel Avenue<br></br>Harare CBD<br></br></p><p style = 'color: #1fc600'><em>We are Your Technology Partner for Digital Success.</em></p></div></div></body></html>`;
    const body = `<!DOCTYPE html><html><head><title>User Sign-in Form</title><style>body{font-family:Arial,sans-serif;}.form-section{margin-top:10px;padding:10px;background-color:#fff;}.form-label{font-size:12px;font-weight:bold;margin-bottom:5px;color:#000 !important;}.form-input{font-size:12px;padding:5px;border:1px solid black;border-radius:5px;width:100%;}.form-signature{font-size:18px;font-weight:bold;text-decoration:underline;margin-bottom:10px;color:#000 !important;}.form-consent{font-size:12px;margin-bottom:10px;color:#000 !important;}.form-signature-line{font-size:12px;margin-top:10px;color:#000 !important;}</style></head><body><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="col-md-8 col-sm-8 col-xs-8" style='width:80%'><h1 style='color: blue;'>Tell Them Message Service</h1><h2>Application Form</h2><p><h2 style="float: right; color:#949393 ">Reference: ${ref}</h2><table><tr><th>Company Information</th><th></th></tr><tr><td>Company Name:</td><td  style="color: blue;   border-style: groove;">${company_name}</td></tr><tr><td>Address:</td><td style="color: blue;   border-style: groove;">${address}</td></tr><tr><td>Phone No. 1:</td><td style="color: blue;   border-style: groove;">${phoneno1}</td></tr><tr><td>Phone No. 2:</td><td style="color: blue;   border-style: groove;">${phoneno2}</td></tr><tr><td>Company Email:</td><td style="color: blue;   border-style: groove;">${company_email}</td></tr><tr><td>Payment Style:</td><td style="color: blue;   border-style: groove;">${payment_style}</td></tr></table><br/><table><tr><th>User Information</th><th></th></tr><tr><td>Username:</td><td style="color: blue;   border-style: groove;">${username}</td></tr><tr><td>User Email:</td><td style="color: blue;   border-style: groove;">${user_email}</td></tr></table><p><h2 style="color:#000 !important;">Declaration</h2><label class="form-consent" style="font-size:14px;">I/We _______________________ ______________________ do hereby declare that I am the authorised representative of thus named entity. I/We hereby consciously apply for the services of using the Tell Them Message Service gateway and to be bound by the terms and conditions of the use of the service</label> <br/><br/> Full Names: ___________________________   ___________________________     ID: ________________________ <br/> <br/> Date: _______________________________     Signature: _______________________________________________ <br/><br/></p></div><div class="col-md-4 col-sm-4 col-xs-4"><p style = ' margin-top: 25px'><b>Client Services</b><br></br><b>Softworks Team</b><br></br>0773406449, 0777304942<br></br> www.softworkscapital.com <br/> Bonvyx Company Pvt Ltd t/a softworks <br></br>30 Samora Machel Avenue<br></br>Harare CBD<br></br></p><p style = 'color: #1fc600'><em>We are Your Technology Partner for Digital Success.</em></p></div></div></body></html>`;

    try {
        // Create a nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: smtpServer,
            port: smtpPort,
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
        });

        // Create the email options
        const mailOptions = {
            from: senderEmail,
            to: user_email,
            subject: subject,
            html: body,
        };


        // Send the email
        const info = transporter.sendMail(mailOptions);

        console.log('Email sent successfully.');
        console.log('Info object:', info);

        // Append the sent email to the "Sent" folder using IMAP
        const imap = new Imap({
            user: senderEmail,
            password: senderPassword,
            host: imapServer,
            port: imapPort,
            tls: true,
        });

        imap.once('ready', () => {
            imap.openBox('Sent', true, (err) => {
                if (err) {
                    console.error('Error opening "Sent" folder:', err);
                    imap.end();
                    return reject(err);
                    return;
                }

                // Create the email message as MIMEText
                const emailMessage = `From: ${senderEmail}\r\nTo: ${user_email}\r\nSubject: ${subject}\r\n\r\n${body}`;

                // Append the sent email to the "Sent" folder
                imap.append(emailMessage, { mailbox: 'Sent' }, (appendErr) => {
                    if (appendErr) {
                        console.error('Error appending email to "Sent" folder:', appendErr);
                        return reject(err);
                    } else {
                        console.log('Email appended to "Sent" folder.');
                        resolve({ status: '200', message: 'sent successfully' });
                        imap.end();
                        return;
                    }
                    imap.end();
                });
            });
        });

        imap.once('error', (imapErr) => {
            console.error('IMAP Error:', imapErr);
            return reject(err);
        });

        imap.connect();
    } catch (error) {
        console.error('Error sending email:', error);
        return reject(err);
    }
})
}


module.exports = crudsObj;
