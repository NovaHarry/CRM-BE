var express = require('express');
const { serviceRequestModel } = require('../schemas/serviceRequestsSchema');
var router = express.Router();

/* GET ALL SERVICE TASKS */
router.get('/allServices', async(req, res, next)=>{
    try{
      let services = await serviceRequestModel.find();
      res.status(200).send({
        services,
        message:"Tasks fetched successfully"
      })
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });



router.post('/newserviceRequests',async(req,res)=>{
    try{
      let serviceRequests = await serviceRequestModel.findOne({assigneeEmail:req.body.assigneeEmail});
      if(!serviceRequests){
      let serviceRequests = await serviceRequestModel.create(req.body);
      res.status(201).send({
        message:"Service Requests added Successfully",
      })
    }
    else{
      res.status(400).send({
        message:"Service Requests already exist!"
      })
    }
    
   } catch(error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });



  module.exports = router;