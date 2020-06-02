
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    //authorization === Bearer token (fhbskrgargerog)
    if(!authorization){
        res.json({error:"You must be logged in!"});
    } 
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.json({error:"You must be logged in!"});
        }
        const {_id} = payload;
        User.findById(_id).then((userData)=>{
            req.user = userData;
            next();
        })
        
    });
}