const mongoose = require('mongoose');
const validator = require('validator');

let serviceRequestSchema = new mongoose.Schema(
    {
        serviceTask:{type:String,required:true},
        assignee:{type:String,required:true},
        due_date:{type:String,required:true},
        priority:{type:String,required:true},
        assigneeEmail:{
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

let serviceRequestModel = mongoose.model('services', serviceRequestSchema);
module.exports={serviceRequestModel};