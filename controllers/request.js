const User = require('../model/Users')
const Request = require('../model/Request')

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
        const {id}=req.parmas;
        const user = await User.findById(id);
        const request = new Request({...req.body});
        request.user = user;
        await request.save();
        user.requests.push(request);
        await user.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({error})     
    }
}

module.exports.changeStatus = async(req,res)=>{
    try {
        const {id}=req.params;
        const request = await Request.findByIdAndUpdate(id,{...req.body});
        await request.save();
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({error})
    }
}