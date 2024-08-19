const session = require("express-session")
const { userModel } = require("../../../db/models/user.model")
const { messageModel } = require("../../../db/models/message.model")

module.exports.index =(req,res,next)=>{
    res.render("index.ejs",{
        loggedIn:false
    })
}
module.exports.login =(req,res,next)=>{
    res.render("login.ejs",{
        error:req.query.error,
        loggedIn:false

    })
}
module.exports.register =(req,res,next)=>{
    res.render("register.ejs" , {
        error:req.query.error,
        loggedIn:false
    })
}


module.exports.message = async (req,res,next)=>{
    const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`
    const messages = await messageModel.find({userId:req.session.userId})
    if (req.session.loggedIn) {
        res.render("message.ejs",{
            loggedIn:req.session.loggedIn,
            session: req.session,
            url,
            messages
        })
    } else{
        res.redirect("/login")
    }
    
}

module.exports.user =(req,res,next)=>{
    res.render("user.ejs",{
        loggedIn:req.session.loggedIn,
        session:req.session
    })
}


module.exports.handleRegister =async (req,res,next)=>{
    const {name , email , password} = req.body
    const userExist = await userModel.findOne({email})
    if (userExist) {
        return   res.redirect("/register?error=user already Exist")
    }
    await userModel.create({name , email , password})
    res.redirect("/login")
}


module.exports.handleLogin =async (req,res,next)=>{
    const { email , password} = req.body
    const userExist = await userModel.findOne({email})
    if (!userExist || password != userExist.password) {
        return   res.redirect("/login?error=user not Exist or invalid password")
    }else{
        req.session.userId = userExist._id
        req.session.name = userExist.name
        req.session.loggedIn = true
        res.redirect("/message")
    }

}


module.exports.logOut = async(req,res,next)=>{
    req.session.destroy(function(err) {
        res.redirect("/login")

      })
}


module.exports.sendMsg = async(req,res,next)=>{
    // console.log(req.body);
    // console.log(req.params);
    await messageModel.create({
        content:req.body.content,
        userId:req.params.id
    })
    res.redirect(`/user/${req.params.id}`)
    
}