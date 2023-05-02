var express = require('express');
const { leadsModel } = require('../schemas/leadsSchema');
var router = express.Router();

/* GET ALL USERS */
router.get('/allLeads', async(req, res, next)=>{
    try{
      let leads = await leadsModel.find();
      res.status(200).send({
        leads,
        message:"Leads data fetch successfull"
      })
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });



router.post('/leadAdd',async(req,res)=>{
    try{
      let leads = await leadsModel.findOne({officialEmail:req.body.officialEmail});
      if(!leads){
      let leads = await leadsModel.create(req.body);
      res.status(201).send({
        message:"Leads added Successfully",
      })
    }
    else{
      res.status(400).send({
        message:"Leads already exist!"
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