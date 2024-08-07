const express = require('express');
require('dotenv').config();
const cors = require('cors');
const https = require('https');

const authenticateToken = require('./utilities/authenticateToken');

const multer = require('multer');
const axios = require('axios');

const nodemailer = require('nodemailer');
const Imap = require('imap');
const { simpleParser } = require('mailparser');

const path = require('path');
const fs = require('fs');

const pool = require('./cruds/poolapi');

// Route path
const userRouter = require('./routes/users');
const clientRouter = require('./routes/client_profile');
const groupsRouter = require('./routes/my_groups');
const contactRouter = require('./routes/contacts');
const sentMessagesRouter = require('./routes/sent_messages');
const topUpRouter = require('./routes/topUp');
const contactGroupsRouter = require('./routes/contact_groups');
const registrationRouter = require('./routes/self_registration');
const mailerRouter = require('./routes/mailer');
const sendersRouter = require('./routes/sender_id');

const app = express();
app.use(express.json());
app.use(cors());

//App Route Usage
app.use('/users', userRouter);
app.use('/clients', clientRouter); //authenticateToken, Checked
app.use('/groups', authenticateToken, groupsRouter);
app.use('/contacts', authenticateToken, contactRouter);
app.use('/sentmessages',  sentMessagesRouter); //authenticateToken,
app.use('/topUp',  topUpRouter); //authenticateToken,
app.use('/contactgroups', authenticateToken, contactGroupsRouter);
app.use('/selftregistration', registrationRouter);
app.use('/mailer', mailerRouter);
app.use('/senderid', sendersRouter); //authenticateToken,

//SMS ENDPOINT
app.get('/client/api/sendmessage/', async (req, res) => {
  try {
    const apikey = req.query.apikey;
    const mobiles = req.query.mobiles;
    const sms = req.query.sms;
    const senderid = req.query.senderid;

    // const originalUrl = `http://sms.vas.co.zw/client/api/sendmessage?apikey=${apikey}&mobiles=${mobiles}&sms=${sms}&senderid=${senderid}`;
    const originalUrl = `http://sms.vas.co.zw/client/api/sendmessage?apikey=e28bb49ae7204dfe&mobiles=+263787364591&sms=Hello&senderid=softworks`;

    // Make a request to the original URL
    const response = await axios.get(originalUrl);

    // Send the response from the original URL
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//FILE UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = function (req, file, cb) {
  cb(null, true); // Allow all file types
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const uploadedFilename = req.file.filename;
  console.log('File uploaded:', uploadedFilename);

  res.status(200).send(`File uploaded successfully. Filename: ${uploadedFilename}`);
});
// Set up a route for file retrieval
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found.');
  }

  // Stream the file as the response
  res.sendFile(filePath);
});


// Call the function to send the email and append it to the "Sent" folder
app.get('/sendemail', (req, res) => {
  res.send(sendEmailAndAppend());
});

// Send message
app.post('/sendSMS', authenticateToken, (req, res) => {
  const { dest_phone, msgbody, selectedCategory } = req.body;
  console.log('sender ID: ', selectedCategory);

  // const originalUrl = `http://196.43.100.209:8901/teleoss/sendsms.jsp?user=Softwork&password=Soft@012&mobiles=${dest_phone}&sms=${msgbody}&unicode=1&clientsmsid=10001&senderid=Softwork`;
  const originalUrl = `https://sms.vas.co.zw/client/api/sendmessage?apikey=e28bb49ae7204dfe&mobiles=${dest_phone}&sms=${msgbody}&senderid=${selectedCategory}`;

  axios.get(originalUrl)
    .then(() => {
      res.status(200).json({ status: 'success', message: 'SMS sent successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.post('/smsendpoint', (req, res) => {
  const { clientid, clientkey, message, recipients, senderid } = req.body;

  // Check client ID and key
  axios
    .get(`${pool}/clients/api/${clientid}/${clientkey}`)
    .then((response) => {
      const clientData = response.data;

      if (!clientData || clientData.length === 0) {
        return res.status(400).json({ error: 'Invalid clientid or clientkey' });
      }

      // Validate sender ID
      return fetch(`${pool}/senderid/${clientid}`)
        .then(res => res.json())
        .then(resp => {
          console.log("Sender ID response:", resp);
          // Check if senderid is valid
          const validSenderIds = resp.map(item => item.sender_name);
          if (!validSenderIds.includes(senderid)) {
            return res.status(400).json({ error: 'Invalid senderid' });
          }

          // Proceed to check balance
          return axios.get(`${pool}/topup/lasttopup/${clientid}`);
        });
    })
    .then(balanceResponse => {
      const balanceData = balanceResponse.data;

      if (!balanceData || balanceData.results.length === 0) {
        return res.status(400).json({ error: 'Could not retrieve client balance' });
      }

      const balance = balanceData.results[0].balance;
      const totalCost = recipients.length * 0.046;

      if (balance < totalCost) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      const currentDate = new Date().toISOString();
      const postData = {
        client_profile_id: clientid,
        message_type: "SMS",
        origin_phone: "YourOriginPhone",
        arr: recipients,
        date_sent: currentDate,
        group_id: "",
        contact_grouping_id: "",
        msgbody: message,
        currency: "USD",
        exchange_rate: 1,
        credit: 0.046,
        debit: 0,
        balance: 0,
        description: "SMS sending",
        vat: 0.15,
        costIncl: 0.046
      };

      // Log sent message data
      console.log('Post data for sent messages:', postData);

      return axios.post(`${pool}/sentmessages`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    })
    .then(response => {
      console.log('Response from sent messages:', response.data);

      // Proceed with sending SMS
      const dest_phone = recipients.join(',');
      const originalUrl = `https://sms.vas.co.zw/client/api/sendmessage?apikey=e28bb49ae7204dfe&mobiles=${dest_phone}&sms=${message}&senderid=${senderid}`;

      return axios.get(originalUrl);
    })
    .then(() => {
      res.status(200).json({ status: 'success', message: 'SMS sent successfully' });
    })
    .catch(error => {
      // Handle any errors that occur in the promise chain
      console.error('Error:', error.message);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      }
    });
});


const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/srv547457.hstgr.cloud/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/srv547457.hstgr.cloud/privkey.pem')
};

https.createServer(options, app).listen(process.env.APPPORT || '3003', () => {
  console.log('app is listening to port' + process.env.APPPORT);
});

// app.listen(process.env.APPPORT || '3003', () => {
//   console.log('app is listening to port' + process.env.APPPORT);
// });