const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// In-memory fallback
const inMemoryUsers = new Map();

const isDbConnected = () => mongoose.connection.readyState === 1;

// Generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailLower = email.toLowerCase();
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (isDbConnected()) {
      let user = await User.findOne({ email: emailLower });
      if (!user) {
        user = await User.create({ email: emailLower });
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      // Fallback
      const user = inMemoryUsers.get(emailLower) || { _id: 'mem_' + Date.now(), email: emailLower };
      user.otp = otp;
      user.otpExpires = otpExpires;
      inMemoryUsers.set(emailLower, user);
    }

    // Send Email
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">CareerSense</h2>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Your One-Time Password (OTP) for securely logging into CareerSense is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; background-color: #f1f5f9; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px; color: #0f172a;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #64748b; text-align: center;">This code will expire in 10 minutes. Do not share this code with anyone.</p>
        </div>
      </div>
    `;

    const emailSent = await sendEmail({
      to: emailLower,
      subject: 'Your CareerSense Login Code',
      html: htmlTemplate,
    });

    if (emailSent) {
      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email. Check SMTP configuration.' });
    }
  } catch (error) {
    console.error('Error in sendOtp:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const emailLower = email.toLowerCase();
    let user;

    if (isDbConnected()) {
      user = await User.findOne({ email: emailLower });
    } else {
      user = inMemoryUsers.get(emailLower);
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid
    if (isDbConnected()) {
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
    } else {
      user.isVerified = true;
      user.otp = null;
      user.otpExpires = null;
      inMemoryUsers.set(emailLower, user);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        profileId: user.profileId || null
      }
    });
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendOtp,
  verifyOtp
};
