const express = require('express');
const router  = express.Router();
const {ensureAuthenticated, ensureIsAdmin} = require('../config/auth') 
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    console.log(req.user)
    res.render('dashboard',{
        user: req.user
    });
})
router.get('/admindashboard',ensureIsAdmin,(req,res)=>{
    console.log(req.user)
    res.render('admindashboard',{
        user: req.user
    });
})
module.exports = router; 