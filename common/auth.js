const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}

const hashCompare =  async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}


// CREATING TOKEN
// we can pass {name,email,id,role} or as payload 


const createToken = async(payload)=>{
    let token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1m'})
    return token
}

const validate = async(req,res,next)=>{

    if(req.headers.authorization){

        let token = req.headers.authorization.split(" ")[1];
        let data = await jwt.decode(token);
        if(Math.floor((+new Date())/1000) < data.exp){
            next()
        }else{
            res.status(401).send({
                message:"Token Expired!"
            })
        }
    }
    else{
        res.status(400).send({
            message:"Token not found!"
        })
    }
}

const roleAdminGuard = async (req,res,next)=>{
    if(req.headers.authorization){

        let token = req.headers.authorization.split(" ")[1];
        let data = await jwt.decode(token);
        if(data.role === 'admin'){
            next()
        }else{
            res.status(402).send({
                message:"Only admin is allowed!"
            })
        }
    }
    else{
        res.status(400).send({
            message:"Token not found!"
        })
    }
}

module.exports = {hashPassword, hashCompare, createToken, validate, roleAdminGuard};
