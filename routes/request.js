const express = require('express')
const {getAll,addRequest,getUserRequests,changeStatus}=require('../controllers/request')
const router=express.Router();


router.get('/',getAll);
router.post('/',addRequest)
router.patch('/',changeStatus);
router.get('/:id',getUserRequests);

module.exports=router;