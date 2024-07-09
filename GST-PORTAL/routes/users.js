var express = require('express');
const crypto = require('crypto');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { authMiddleware }= require('../auth/authMiddleware');
require('dotenv').config()

/* GET users listing. */
router.get('/ping',authMiddleware,async function(req, res, next) {


  res.json({msg:"hellooo"});
});

router.post('/signup', async (req, res) => {
  const { username, password,email } = req.body;
 const id=uuidv4()
 const { db } = req;
  try {
    const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
    let userDetails = await  db.connection.exec(query, [email]);
    if(userDetails.length>0){
      res.status(400).json({ message: 'user already exist' });
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await  db.connection.exec(
        `INSERT INTO "${db.schema}"."userData" (ID, NAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)`,
        [id, username, email, hashedPassword]
      );
     
      
   
  
      res.status(201).json({ message: 'User created successfully' });
    }
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
const db=req.db
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
    const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
    const result = await  db.connection.exec(query, [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
 
    const updateQuery = `UPDATE "${db.schema}"."userData" SET OTP = ? , OTPVALIDITY = ? WHERE EMAIL = ?`;
    const update = await  db.connection.exec(updateQuery, [otp,Date.now() + 10 * 60 * 1000, email]);
    

    transporter.sendMail({
      from: 'AdminGstReq@ivldsp.com',
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Your OTP Code</h2>
          <p>Hello,</p>
          <p>Thank you for using our service. Your OTP code is:</p>
          <div style="padding: 10px 20px; background-color: #f4f4f4; border: 1px solid #ddd; display: inline-block; font-size: 18px; font-weight: bold;">
            ${otp}
          </div>
          <p>This code is valid for 8 minutes. Please use it to complete your login process.</p>
          <p>If you did not request this code, please ignore this email.</p>
          <p>Thank you,</p>
          <p>GST Req Admin</p>
          <hr style="border-top: 1px solid #ddd; margin-top: 20px;"/>
          <p style="font-size: 12px; color: #999;">
            This is an automated message, please do not reply.
          </p>
        </div>
      `
    }, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error sending OTP' });
      }
      
      res.json({ message: 'OTP sent to your email' });
    });
    

  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

router.post('/verify-otp',async (req, res) => {
  const { email, otp } = req.body;
  const { db } = req;
  const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
  const result = await  db.connection.exec(query, [email]);
  const user=result[0]
  if (result[0]?.OTP !== otp) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }
  if (Date.now() > user.OTPVALIDITY) {
    return res.status(401).json({ message: 'OTP has expired' });
  }
  const token = jwt.sign({ id: user.ID, email: user.EMAIL }, process.env.secretKey, { expiresIn: '1h' });
    res.json({ token });
});

router.post('/resend-otp',async (req, res) => {
  const { email } = req.body;
  const { db } = req;
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const updateQuery = `UPDATE "${db.schema}"."userData" SET OTP = ? , OTPVALIDITY = ? WHERE EMAIL = ?`;
  const update = await  db.connection.exec(updateQuery, [otp,Date.now() + 10 * 60 * 1000, email]);
  

  transporter.sendMail({
    from: 'AdminGstReq@ivldsp.com',
    to: email,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p>Hello,</p>
        <p>Thank you for using our service. Your OTP code is:</p>
        <div style="padding: 10px 20px; background-color: #f4f4f4; border: 1px solid #ddd; display: inline-block; font-size: 18px; font-weight: bold;">
          ${otp}
        </div>
        <p>This code is valid for 8 minutes. Please use it to complete your login process.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you,</p>
        <p>GST Req Admin</p>
        <hr style="border-top: 1px solid #ddd; margin-top: 20px;"/>
        <p style="font-size: 12px; color: #999;">
          This is an automated message, please do not reply.
        </p>
      </div>
    `
  }, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error sending OTP' });
    }
    
    res.json({ message: 'OTP sent to your email' });
  });

});

router.post('/forgot-password',async (req, res) => {
  const { db } = req;
  const { email } = req.body;
  const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
  const result = await  db.connection.exec(query, [email]);

  if (result.length === 0) {
    return res.status(404).send('User not found');
  }

 
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000; 

 
  const updateQuery = `UPDATE "${db.schema}"."userData" SET RESETTOKEN = ? , RESETTOKENEXPIRY = ? WHERE EMAIL = ?`;
  const update = await  db.connection.exec(updateQuery, [resetToken,resetTokenExpiry, email]);
 
  const resetLink = `${process.env.Front_END_URL}/reset-password?token=${resetToken}&email=${email}`;


  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  transporter.sendMail({
    from: 'AdminGstReq@ivldsp.com',
    to: email,
    subject: 'Your Password reset link',
    html: `
    <p>Hi,</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thanks,<br>Your Company</p>
  `
  }, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error sending OTP' });
    }
    
    res.json({ message: 'Password reset link was sent to your mail' });
  });


  // Send email

});

router.post('/reset-password', async (req, res) => {
  const { token, email, password } = req.body;
  const { db } = req;
  const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
  const result = await  db.connection.exec(query, [email]);

const user=result[0]
  if (!user || user.RESETTOKENEXPIRY < Date.now()) {
    return res.status(400).send('Invalid or expired token');
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  const updateQuery = `UPDATE "${db.schema}"."userData" SET PASSWORD = ? , RESETTOKEN = ? , RESETTOKENEXPIRY = ? WHERE EMAIL = ?`;
  const update = await  db.connection.exec(updateQuery, [hashedPassword,null,null, email]);

  res.json({ message:'Password has been reset'});
});

router.post('/expired-link', async (req, res) => {
  const {  email } = req.body;
  const { db } = req;
  const query = `SELECT * FROM "${db.schema}"."userData" WHERE EMAIL = ?`;
  const result = await  db.connection.exec(query, [email]);

const user=result[0]
  if (!user || user.RESETTOKENEXPIRY < Date.now()) {
    return res.json({message:'Invalid or expired token'});
  }
else{
  return res.json({message:'link till valid'});
}

  
});



module.exports = router;
