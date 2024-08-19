const express = require('express')
const app = express()
const { connectionDB } = require('./db/connectionDB.js')
const userRouter = require('./src/modules/users/user.routes.js')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);


const port = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/mvc',
    collection: 'mySessions'
  });



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))

// app.set('views' , 'viewssss')
app.use(userRouter)



connectionDB()
app.use('*', (req, res) => res.send({msg:'404 not found'}))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))