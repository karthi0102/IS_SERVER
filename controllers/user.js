const User = require('../model/Users.js')
const bcrypt = require('bcryptjs')
const { pushnotify }=require('./notification.js')

const jwt = require('jsonwebtoken')
module.exports.login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({error:"User not Found"});
        }
        const hashPassword = await bcrypt.compare(password,user.password);
        if(!hashPassword){
            res.status(401).json({message:"Password dont match"})
        }
        pushnotify([deviceId],user.name,'Welcome Back to Insta seva');
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});        
    } catch (error) {
        res.status(500).json({error:error})
    }
}


module.exports.register =async(req,res)=>{
    const {email,name,phone,password,deviceId}=req.body;
    try {
        const admin = await User.findOne({email});
        if(admin){
            return res.status(400).json({error:"User already found"})  
        }
        const hashpassword = await bcrypt.hash(password,12);
        const newUser = new User({email,phone,name,password:hashpassword,deviceId});
        pushnotify([deviceId],name,'Welcome to Insta seva');
        await newUser.save();
        const token = jwt.sign({email,id:newUser._id},'token',{expiresIn:'10d'})
        
       return res.status(200).json({token,user:newUser})
    } catch (error) {
        res.status(500).json({error})
    }
}

