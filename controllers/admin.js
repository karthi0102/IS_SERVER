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

