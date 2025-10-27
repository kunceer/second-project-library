const express = require("express");
const User = require("../models/user.js");
const bcrypt = require('bcrypt')

const router = express.Router();

router.get("/register", (req, res)=> {
    res.render("users/register.ejs");

});

module.exports=router;