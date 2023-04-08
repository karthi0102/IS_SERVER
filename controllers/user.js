const User = require('../model/User')
const bcrypt = require('bcryptjs')
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
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});        
    } catch (error) {
        res.status(500).json({error:error})
    }
}

