const mongoose = require('mongoose');
const validator = require('validator');

let leadsSchema = new mongoose.Schema(
    {
        companyName:{type:String,required:true},
        sector:{type:String,required:true},
        Symbol:{type:String,required:true},
        avgPrice:{type:String,required:true},
        marketPrice:{type:String,required:true},
        numberofShares:{type:String,required:true},
        officialEmail:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            },
        },
        status:{type:String,required:true}
        },
    {
        versionKey:false
    }
)

let leadsModel = mongoose.model('leads', leadsSchema);
module.exports={leadsModel};
