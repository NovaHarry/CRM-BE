const mongoose = require('mongoose');
const validator = require('validator');

let userSchema = new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            },
        },
        password:{type:String,required:true},
        role:{type:String,default:"employee"},
        createdAt:{type:Date,default:Date.now}
        },
    {
        versionKey:false
    }
)

let userModel = mongoose.model('users', userSchema);
module.exports={userModel};
