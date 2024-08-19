const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type : String
    },
    email:{
        type : String
    },
    password:{
        type : String
    }
})


module.exports.userModel = mongoose.model("users" , userSchema)