const express = require("express");
const User = require("../models/user.js");
const bcrypt = require('bcrypt')

const router = express.Router();

router.get("/register", (req, res)=> {
    res.render("users/register.ejs");

});
router.post("/register",async(req,res)=> {
    const {name,email,password}=req.body
    try{
        const exist=await User.findOne({email})
        if (exist)
            return res.render("users/register.ejs", { error: "Email already in use"});

        const user = new User({
            name,
            email,
            password

        })
        await user.save();
        res.redirect("/")
        
    } catch (err) {
        console.error(err);
        res.render("register.ejs", {error: "Something went wrong"});
    }
})

module.exports=router;