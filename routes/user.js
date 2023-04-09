const express = require('express')
const {login,register}=require('../controllers/user.js')
const {otp_sendEmail}=require('../controllers/mail.js')
const router = express.Router();


router.post('/login',login)
router.post('/register',register)
router.post('/otp',otp_sendEmail)

module.exports = router;