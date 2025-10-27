const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const User=require("./models/user.js")
const app=express()
const path=require("path")
const mongoose=require("mongoose")
const userController= require('./controllers/library.js')
const  authContoller = require('./controllers/auth.js')


const port = process.env.PORT ? process.env.PORT : '3000'
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }));






  app.get("/",(req,res)=>{
    res.render("index.ejs")
  })  

  app.use('/',authContoller)
  
  app.use('/library',userController)

app.listen(port)