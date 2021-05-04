const express = require('express');
const bodyParser = require('body-parser');
const fs=require('fs');
const app = express();
const port =5000;
const path = require('path')
const usersRoutes = require('./routes/users-routes');
app.use(bodyParser.json());
app.use(express.static('uploads/images/'))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT,PATCH, DELETE');
    next();
})
app.use('/api/users',usersRoutes);
app.use((err,req,res,next)=>{

    if(res.headerSent)
    {
        return next(err);
    }
    res.status(err.code||500);
    res.json({message:err.message||'Unknown error'})
})
app.listen(port)