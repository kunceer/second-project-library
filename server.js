const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const User=require("./models/user.js")
const app=express()
const path=require("path")
const mongoose=require("mongoose")
const userController= require('./controllers/library.js')
const  authContoller = require('./controllers/auth.js')
const session = require("express-session");
const methoOverride = require('method-override')


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));



const port = process.env.PORT ? process.env.PORT : '3000'
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.static(path.join(__dirname, "public")))
app.use(methoOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } 
    })
  );


  app.get("/",(req,res)=>{
    res.render("index.ejs",{ error: null})
  })  

  app.use('/',authContoller)
  
  app.use('/library',userController)

app.listen(port)