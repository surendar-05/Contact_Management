const { default: mongoose } = require("mongoose");
const moongoose=require("mongoose");

const contactSchema= mongoose.Schema({
    name:{
    type:String,
    required:[true,"Please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"Please add the contact email address"],
    },
    phone:{
        type:String,
        required:[true,"Please add the Phone number"],
    },
},{
    timestamps:true,
})


module.exports= mongoose.model("Contact",contactSchema);