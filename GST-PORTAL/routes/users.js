var express = require('express');
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
 const db =req.db
  try {
    const query = `SELECT * FROM "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" WHERE EMAIL = ?`;
    let userDetails = await db.exec(query, [email]);
    if(userDetails.length>0){
      res.status(400).json({ message: 'user already exist' });
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await db.exec(
        `INSERT INTO "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" (ID, NAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)`,
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
    const query = `SELECT * FROM "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" WHERE EMAIL = ?`;
    const result = await db.exec(query, [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
 
    const updateQuery = `UPDATE "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" SET OTP = ? , OTPVALIDITY = ? WHERE EMAIL = ?`;
    const update = await db.exec(updateQuery, [otp,Date.now() + 10 * 60 * 1000, email]);
    

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
  const db=req.db
  const query = `SELECT * FROM "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" WHERE EMAIL = ?`;
  const result = await db.exec(query, [email]);
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
  const db=req.db
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const updateQuery = `UPDATE "10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT"."userData" SET OTP = ? , OTPVALIDITY = ? WHERE EMAIL = ?`;
  const update = await db.exec(updateQuery, [otp,Date.now() + 10 * 60 * 1000, email]);
  

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

module.exports = router;
