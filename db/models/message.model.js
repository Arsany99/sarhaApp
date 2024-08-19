const { default: mongoose, Types } = require("mongoose");

const messageSchema = new mongoose.Schema({
    content:{
        type : String
    },
    userId:{
        type:Types.ObjectId,
        ref : 'user'
    }

})


module.exports.messageModel = mongoose.model("message" , messageSchema)