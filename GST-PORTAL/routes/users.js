var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
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
    console.log(process.env.secretKey);
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

    const token = jwt.sign({ id: user.ID, email: user.EMAIL }, process.env.secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});


module.exports = router;
