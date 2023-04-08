const Service = require('../model/Service.js')
const Category = require('../model/Category.js')
module.exports.addService = async(req,res)=>{
    try {
    
        const {category}=req.body
        const service = new Service({...req.body});
        await service.save();
        const categorymodel = await Category.findOne({title:category});
        categorymodel.services.push(service);
        await categorymodel.save();
        res.status(201).json(service)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error})
    }
}

module.exports.getServices =async(req,res)=>{
    try {
        const service = await Service.find({});
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports.editService = async(req,res)=>{
    try{
        const {_id}=req.body;
        const service = await Service.findByIdAndUpdate(_id,{...req.body});
        await service.save();
        res.status(200).json(service);
    }catch(error){
        res.status(500).json({error})
    }
}

module.exports.deleteService = async(req,res)=>{
    try {
        const {id}=req.params;
        const service = await Service.findById(id);
        const category= await Category.findOne({title:service.category})
        category.services.remove(service);
        await category.save();
        await Service.findByIdAndDelete(id);
        
        res.status(200).json({message:"Success"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error})
    }
}