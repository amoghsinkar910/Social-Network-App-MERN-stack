const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(MONGOURI,{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
    console.log("Successfully connected to mongoDB");
});

mongoose.connection.on('error',(err)=>{
    console.log("Error: ",err);
});

app.get('/',(req,res)=>{
    res.send("Hello world!");
});

app.listen(PORT,()=>{
    console.log("Server running successfully on port ",PORT);
    
})