const { default: mongoose } = require("mongoose");

module.exports.connectionDB = async ()=>{   
    mongoose.connect("mongodb://localhost:27017/mvc")
    .then(()=>{
        console.log('database connected');
    }).catch((err)=>{
        console.log(err , 'databade connection error');
    })
}

