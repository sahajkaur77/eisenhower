const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const otpStore = {}; // Temporary store for OTPs, ideally use a database
// Twilio setup
// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = twilio(accountSid, authToken);
// Twilio setup ends

app.use(bodyParser.json());

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in a temporary store, or ideally a database
  otpStore[phoneNumber] = otp;

  // client.messages
  //   .create({
  //     body: `Your OTP code is ${otp}`,
  //     from: twilioPhoneNumber,
  //     to: phoneNumber,
  //   })
  //   .then((message) => {
  //     console.log(`Message sent to ${phoneNumber} with SID ${message.sid}`);
  //     res.json({ success: true, message: 'OTP sent via SMS' });
  //   })
  //   .catch((error) => {
  //     console.error('Error sending OTP via Twilio:', error);
  //     res.status(500).json({ success: false, message: 'Failed to send OTP' });
  //   });

  // Simulate sending OTP (implement SMS API here)
  console.log(`OTP for ${phoneNumber}: ${otp}`);
  res.json({ success: true, message: 'OTP sent' });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    res.json({ success: true, message: 'OTP verified' });
  } else {
    res.json({ success: false, message: 'Invalid OTP' });
  }
});

app.listen(process.env.port || 3000, () =>
  console.log('Server running on port 3000')
);
