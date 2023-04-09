const express = require('express')
const {login,register}=require('../controllers/admin')
const router=express.Router();


router.post('/register',register),
router.post('/login',login)




module.exports=router;