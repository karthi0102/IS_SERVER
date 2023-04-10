const Category = require('../model/Category')
const User = require('../model/Users.js')
const {sendMessage}=require('./mail')

module.exports.getAllCategory =  async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports.addNewCategory = async(req,res)=>{
    try {
        const category = new Category({...req.body});
        await category.save();
        const user = await User.find({});
        const emails = user?.map(u => u.email);
        sendMessage(emails,"A New Category has been added Please Check It in the app")
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports.editCategory = async(req,res)=>{
    try{
        const {_id}=req.body;
        const category = await Category.findByIdAndUpdate(_id,{...req.body});
        await category.save();
        res.status(200).json(category)
    }catch(error){
    
        res.status(500).json({error:error})
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        const {id}=req.params
        await Category.findByIdAndDelete(id);
        
        res.status(200).json({message:"Success"})
    }catch(error){
       
        res.status(500).json({error:error})
    }
}