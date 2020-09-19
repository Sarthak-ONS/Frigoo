const express = require('express')
const mongoose = require("mongoose")
const bcrypt =require("bcryptjs")
const User = require("../models/user")
const {body} = require("express-validator");
const route = express.Router()

route.use((req,res,next)=>{
    console.log("server running")
    next()
})

route.post("/signup" ,[
    body("name").trim().not().isEmpty(),
    body('email').isEmail().withMessage("please enter a valid email.").normalizeEmail(),
    body("password").trim().isLength({min: 6})
    ] ,
    (req,res,next)=>{
     const {name,email,contact,password,confirmPassword} = req.body
     if(!name || !(email||contact) || !password || !confirmPassword){
        return res.status(422).json({error:"please add all details"})
     }
    
     User.findOne({email:email} || {contact:contact}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist"})
        }
        if(confirmPassword != password)
        {
            return res.status(422).json({error:"confirm your password"})
        }
        bcrypt.hash(password,12).then(hashedpassword =>{
            const user =new User({
                email,
                contact,
                password : hashedpassword,
                name
            })
            user.save().then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
route.post("/signin",(req,res)=>{
    //const {email,contact,name,password}=req.body
    const {email,password}=req.body

    //if(!(email || contact || name) || !password)
    if(!email || !password)
    {
        return res.status(422).json({error:"please add all details"})
    }
    //User.findOne({email:email} || {contact:contact} || {name:name})
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
        return res.status(422).json({error:"invalid email and password"})
        }
        bcrypt.compare(password , savedUser.password).then(doMatch=>{
            if(doMatch)
            {
            res.json({message:"successfully signed in"})
        }
        else{
            return res.status(422).json({error:"invalid email and password"})
        }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
})
module.exports = route