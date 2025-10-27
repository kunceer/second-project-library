const expres= require('express')
const User= require('../models/user.js')
const router = expres.Router()


router.get('/',(req,res)=>{
    res.render('users/index.ejs')
})


module.exports = router;