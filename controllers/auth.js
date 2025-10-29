const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const session = require("express-session");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.render("users/register.ejs", { error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = new User({
      name,
      email,
      password:hashedPassword
      
    });

    await user.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("users/register.ejs", { error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("index.ejs", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("index.ejs", { error: "Password incorrect" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return res.redirect("/library"); 
  } catch (error) {
    console.error(error);
    return res.render("index.ejs", { error: "Something went wrong" });
  }
});

router.get('/logout',(req,res)=>{
  req.session.destroy((error)=>{
    if(error){
      return res.redirect('/')
    }
    res.clearCookie('connect.sid')
    res.redirect('/')
  })
})

module.exports = router;
