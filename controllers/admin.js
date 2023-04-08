const Admin = require('../model/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports.login = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({error:"User not Found"})
        }
        const isPasswordCorrect = bcrypt.compare(admin.password,password);
        if(!isPasswordCorrect){
            return res.status(400).json({error:"Password not correct"})
        }
       const token = jwt.sign({email,id:admin._id},'token',{expiresIn:'10d'})
       return res.status(200).json({token,user:admin})
    }catch(error){
        return res.status(500).json({error})
    }
}

module.exports.register =async(req,res)=>{
    const {email,name,phone,password}=req.body;
    try {
        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({error:"User already found"})  
        }
        const hashpassword = await bcrypt.hash(password,12);
        const newUser = new Admin({email,phone,name,password:hashpassword});
        await newUser.save();
        const token = jwt.sign({email,id:newUser._id},'token',{expiresIn:'10d'})
       return res.status(200).json({token,user:admin})
    } catch (error) {
        res.status(500).json({error})
    }
}