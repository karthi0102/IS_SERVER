const express = require('express')
const {getAll,addRequest,getUserRequests,changeStatus}=require('../controllers/request')
const router=express.Router();


router.get('/',getAll);
router.post('/',addRequest)
router.get('/:id',getUserRequests);
router.patch('/:id',changeStatus);

module.exports=router;