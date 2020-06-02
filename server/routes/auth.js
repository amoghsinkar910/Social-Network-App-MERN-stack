const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const{JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/requireLogin');


router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password){
        return res.json({error:"Please enter all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({error:"User already exists"});
        }
        bcrypt.hash(password,13)
        .then((hashedPassword)=>{
            const user = new User({
                name:name,
                email:email,
                password:hashedPassword,
                pic:pic
            })
            user.save()
            .then((user)=>{
                res.json({message:"Saved Successfully"})
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({error:"Enter all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.json({error:"Invalid email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then((flag)=>{
            if(flag){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email,followers,following,pic} = savedUser;
                res.json({token,user:{_id,name,email,followers,following,pic}});
            }
            else{
                return res.json({error:"Invalid username or password"});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })
})
module.exports = router;