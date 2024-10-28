const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const otpStore = {}; // Temporary store for OTPs, ideally use a database

app.use(bodyParser.json());

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in a temporary store, or ideally a database
  otpStore[phoneNumber] = otp;

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

app.listen(3000, () => console.log('Server running on port 3000'));
