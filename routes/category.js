const express = require('express');
const {getAllCategory,addNewCategory,editCategory,deleteCategory}=require('../controllers/category.js')


const router = express.Router()


router.get("/",getAllCategory)
router.post("/",addNewCategory)
router.patch("/",editCategory)
router.delete("/:id",deleteCategory)

module.exports=router;