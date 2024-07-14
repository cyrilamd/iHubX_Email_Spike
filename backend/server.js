const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const MAILJET_API_KEY = '64ef2233e2fbe0c3b3d75d4c27d51f27';
const MAILJET_SECRET_KEY = 'd7c50946e77900d267ad89e5f4412d5f';
const MAILJET_BASE_URL = 'https://api.mailjet.com/v3.1';

const axiosInstance = axios.create({
  baseURL: MAILJET_BASE_URL,
  auth: {
    username: MAILJET_API_KEY,
    password: MAILJET_SECRET_KEY
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

let templates = [];
let segments = [];
let autoReplies = [
  { id: 1, trigger: 'help', response: 'How can I assist you?' },
  { id: 2, trigger: 'support', response: 'Our support team will contact you shortly.' }
];

// Endpoint to save a template
app.post('/api/templates', (req, res) => {
  const { subject, htmlMessage, textMessage } = req.body;
  const newTemplate = { id: uuidv4(), subject, htmlMessage, textMessage };
  templates.push(newTemplate);
  res.send('Template saved.');
});

// Endpoint to update a template
app.put('/api/templates/:id', (req, res) => {
  const { id } = req.params;
  const { subject, htmlMessage, textMessage } = req.body;
  const templateIndex = templates.findIndex(t => t.id === id);
  if (templateIndex !== -1) {
    templates[templateIndex] = { id, subject, htmlMessage, textMessage };
    res.send('Template updated.');
  } else {
    res.status(404).send('Template not found.');
  }
});

// Endpoint to get templates
app.get('/api/templates', (req, res) => {
  res.json(templates);
});

// Endpoint to save a segment
app.post('/api/segments', (req, res) => {
  const { criteria, emails } = req.body;
  let emailList;

  if (typeof emails === 'string') {
    emailList = emails.split(',').map(email => email.trim());
  } else if (Array.isArray(emails)) {
    emailList = emails.map(email => email.trim());
  } else {
    return res.status(400).send('Invalid email format');
  }

  const newSegment = { id: uuidv4(), criteria, emails: emailList };
  segments.push(newSegment);
  res.send('Segment created.');
});

// Endpoint to update a segment
app.put('/api/segments/:id', (req, res) => {
  const { id } = req.params;
  const { criteria, emails } = req.body;
  const segmentIndex = segments.findIndex(s => s.id === id);
  if (segmentIndex !== -1) {
    let emailList;

    if (typeof emails === 'string') {
      emailList = emails.split(',').map(email => email.trim());
    } else if (Array.isArray(emails)) {
      emailList = emails.map(email => email.trim());
    } else {
      return res.status(400).send('Invalid email format');
    }

    segments[segmentIndex] = { id, criteria, emails: emailList };
    res.send('Segment updated.');
  } else {
    res.status(404).send('Segment not found.');
  }
});

// Endpoint to get segments
app.get('/api/segments', (req, res) => {
  res.json(segments);
});

// Endpoint to send a campaign
app.post('/api/send-campaign', async (req, res) => {
  const { subject, message, recipients } = req.body;
  if (!recipients || recipients.length === 0) {
    return res.status(400).send('Recipients list is empty.');
  }
  try {
    const response = await axiosInstance.post('/send', {
      Messages: [
        {
          From: {
            Email: "attivoecyril@gmail.com", // Replace with your verified sender email
            Name: "Xcelsz" // Replace with your name
          },
          To: recipients.map(email => ({ Email: email.trim() })),
          Subject: subject,
          TextPart: message,
          HTMLPart: message
        }
      ]
    });
    res.send('Campaign sent successfully.');
  } catch (error) {
    console.error('Failed to send campaign:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to send campaign.');
  }
});

// Endpoint to schedule an email
app.post('/api/schedule-email', (req, res) => {
  const { subject, message, recipients, schedule } = req.body;
  const scheduleDate = new Date(schedule);
  const cronTime = `${scheduleDate.getMinutes()} ${scheduleDate.getHours()} ${scheduleDate.getDate()} ${scheduleDate.getMonth() + 1} *`;

  cron.schedule(cronTime, async () => {
    try {
      await axiosInstance.post('/send', {
        Messages: [
          {
            From: {
              Email: "attivoecyril@gmail.com", // Replace with your verified sender email
              Name: "Xcelsz" // Replace with your name
            },
            To: recipients.map(email => ({ Email: email.trim() })),
            Subject: subject,
            TextPart: message,
            HTMLPart: message
          }
        ]
      });
      console.log('Scheduled email sent successfully!');
    } catch (err) {
      console.error('Failed to send scheduled email:', err);
    }
  });

  res.send('Email scheduled.');
});

// Endpoint to get auto-replies
app.get('/api/auto-replies', (req, res) => {
  res.json(autoReplies);
});

// Endpoint to set an auto-reply
app.post('/api/set-auto-reply', (req, res) => {
  const { trigger, response } = req.body;
  const newAutoReply = { id: uuidv4(), trigger, response };
  autoReplies.push(newAutoReply);
  res.send('Auto reply set.');
});

// Endpoint to receive an email and trigger auto-reply
app.post('/api/receive-email', (req, res) => {
  const { sender, subject } = req.body;
  autoReplies.forEach(async (reply) => {
    if (subject.includes(reply.trigger)) {
      try {
        await axiosInstance.post('/send', {
          Messages: [
            {
              From: {
                Email: "attivoecyril@gmail.com", // Replace with your verified sender email
                Name: "Xcelsz" // Replace with your name
              },
              To: [{ Email: sender }],
              Subject: 'Auto Reply',
              TextPart: reply.response,
              HTMLPart: reply.response
            }
          ]
        });
        console.log('Auto reply sent successfully!');
      } catch (err) {
        console.error('Failed to send auto reply:', err);
      }
    }
  });
  res.send('Email received.');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../backend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../backend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

