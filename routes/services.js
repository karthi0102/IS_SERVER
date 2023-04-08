const express = require("express")

const { getServices,addService,editService,deleteService } =require("../controllers/services");
const router=express.Router();


router.get('/',getServices);
router.post('/',addService)
router.patch('/',editService)
router.delete('/:id',deleteService)

module.exports =router;