var express = require('express');
var router = express.Router();
const {userModel} = require('../schemas/userSchema');
const {hashPassword,hashCompare, createToken, validate, roleAdminGuard} = require('../common/auth');
const mongoose = require('mongoose');
const {dbUrl} = require('../common/dbConfig');
mongoose.connect(dbUrl);



/* GET ALL USERS */
router.get('/', validate,roleAdminGuard, async(req, res, next)=>{
  try{
    let users = await userModel.find();
    res.status(200).send({
      users,
      message:"Users data fetch successfull"
    })
  }
  catch (error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

//GET USER BY ID

router.get('/:id', async(req, res, next)=>{
  try{
    let users = await userModel.findOne({_id:req.params.id});
    res.status(200).send({
      users,
      message:"User data fetch successfull by ID"
    })
  }
  catch (error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

 // CREATE / POST NEW USERS
 
router.post('/signup',async(req,res)=>{
  try{
    let user = await userModel.findOne({email:req.body.email});
    if(!user){
    let hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    let user = await userModel.create(req.body);
    res.status(201).send({
      message:"User Signup Successfull",
      hashedPassword
    })
  }
  else{
    res.status(400).send({
      message:"User already exist!"
    })
  }
  
 } catch(error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

//LOGIN

router.post('/login',async(req,res)=>{
  try{
    let user = await userModel.findOne({email:req.body.email});
    if(user){
      if(await hashCompare(req.body.password, user.password)){
        //VERIFYING THE PASSWORD
        let token = await createToken({
          firstName:user.firstName,
          laststName:user.lastName,
          email:user.email,
          id:user._id,
          role:user.role
        })
      res.status(200).send({
      message:"User Login Successfull",
      token
    })
  }else{
    res.status(402).send({
      message:"Invalid Credentials"
    })
  }
}
  else{
    res.status(400).send({
      message:"User already exist!"
    })
  }
  
 } catch(error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

//UPDATE USE BY ID

router.put('/:id', async(req,res)=>{
  try{
    let user = await userModel.findOne({_id:req.params.id});
    if(user){
      user.name = req.body.name;
      user.email= req.body.email;
      let hashedPassword = await hashPassword(user.password);
      user.password= hashedPassword;
      user.role= req.body.role;

      await user.save();

    res.status(200).send({
      message:"User updated Successfully"
    })
  }
  else{
    res.status(400).send({
      message:"User does not exist!"
    })
  }
  
 } catch(error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

// DELETE USER BY ID

router.delete('/:id',async(req,res)=>{
  try{
    let user = await userModel.findOne({_id:req.params.id});
    if(user){
    let user = await userModel.deleteOne({_id:req.params.id});
    res.status(201).send({
      message:"User deleted Successfully"
    })
  }
  else{
    res.status(400).send({
      message:"User does not exist!"
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
