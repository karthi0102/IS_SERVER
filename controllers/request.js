const User = require('../model/Users')
const Request = require('../model/Request');
const { pushnotify } = require('./notification');
const Admin = require('../model/Admin');
const {sendMessage}=require('./mail')


module.exports.getAll = async(req,res)=>{
    try{
        const requests = await Request.find({}).populate('user');
        res.status(200).json(requests);
    }catch(error){
        res.status(500).json({error})
    }
}

module.exports.getUserRequests = async(req,res)=>{
    try {  
        const {id}=req.params;
        const user = await User.findById(id).populate('requests');
        res.status(200).json(user.requests);
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports.addRequest = async(req,res)=>{
    try {
        const {id}=req.body;
        console.log(id);
        const user = await User.findById(id);
    
        const request = new Request({...req.body});
        request.user = user;
        await request.save();
        user.requests.push(request);
        await user.save();
        const admins= await Admin.find({});
        const emails = admins.map(a=> a.email);
        console.log(emails)
        sendMessage(emails,`A new request is done by ${user.name} on Category ${req.body.category} in service ${req.body.service} \r\n Phone number - ${user.phone} Email - ${user.email}`)
        res.status(201).json(request);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)     
    }
}

module.exports.changeStatus = async(req,res)=>{
    try {
        const {id}=req.params;
        const request = await Request.findByIdAndUpdate(id,{...req.body}).populate('user');

        await request.save();

        const {deviceId}=request.user;
        pushnotify([deviceId],'Your request was accepted by Admin',request.service);
        sendMessage(req.user.email,"Your request gave been accepted by Admin");
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({error})
    }
}