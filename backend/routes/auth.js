const express = require('express')
const User = require('../models/user')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/user');
const bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');
const JWT_SECRET = "hello@world";
const fetchuser = require('../middleWare/fetchuser.js')

router.post('/', [
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
  try {
    var usr = await User.findOne({ email: req.body.email })
    if (usr) {
      return res.status(400).json({ error: "sorry email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    usr = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
      user: {
        id: usr.id
      }
    }
    const auth_token = jwt.sign(data, JWT_SECRET);
    console.log(auth_token);
    res.json({success:true,auth_token})
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }
})

router.post('/login', [body('email', 'Enter a valid email').isEmail(),
body('password', 'Password cannot be blank').exists()
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) { return res.status(400).json({ success:false, errors: errors.array() }) }
  // console.log(req.body)
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email })
    if (!user) {
      success=false;
      return res.status(400).json({ success,error: " please try to login with correct credentials" })
    }

    const passwordcompare = await bcrypt.compare(password, user.password)
    if (!passwordcompare) {
      return res.status(400).json({ error: " please try to login with correct credentials" })
    }

    const payload = {
      id: {
        id: user.id
      }
    }
    const auth_token = jwt.sign(payload, JWT_SECRET);
    success= true;
    res.json({success,auth_token})
  }



  catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }

})

//route 3 get user login details

router.post('/getuser', fetchuser , async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({_id:userId}).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }
})

module.exports = router;