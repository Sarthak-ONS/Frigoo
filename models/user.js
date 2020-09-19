const express = require("express")
const mongoose =require("mongoose")

const bcrypt =require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type : String, require : true
    },
    email: {
        type : String, require : true
    },
    contact: {
        type : Number, require : true
    },
    password: {
        type : String, require : true
    },
    confirmPassword: {
        type : String, require : true
    }
})

module.exports= mongoose.model("User" , userSchema)