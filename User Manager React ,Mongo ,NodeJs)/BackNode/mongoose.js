const mongoose = require('mongoose');
let user =require('./models/user');
const{ validationResult}=require('express-validator');
 mongoose.connect('mongodb://localhost:27017/React', 
 {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
     console.log("connect to DB");
}).catch(()=>{
    console.log("connection failed")
});


const addUser = async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        return next( new Error("invalid inputs",422));
    }
    const addedUser=new user({
        username:req.body.username,
        email:req.body.email,
        city:req.body.city,
        profilePic:req.file.filename
    })
    try{
       console.log( req.file)
 
     await addedUser.save();
    
    }catch(err){
        console.log(err)
        const error=new Error('creating user failed',500);
        return next(error)
    }
    res.status(201).json({user:addedUser});  
}
const getUsers = async(req,res,next)=>{
    let users;
    try{ users=await user.find();}
    catch(err){
        const error=new Error(' getting users failed',500);
        return next(error)
    }
    if(users.length==0)
    {
        res.json({message:"no users"})
    }
    res.send({users:users.map(user=>user.toObject({getters:true}))});  
       // res.json({users});  

}
const getUserByUsername=async(req,res,next)=>{
    const qu = req.params;
    let users;
    user.findOne({username:qu.username}).then((u)=>res.json({user:u.toObject({getters:true})}))
   /* 
    if(users.length==0)
    {
        res.json({message:"no users"})
    }
    res.json({users});  */
     
     }
const updateUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors)
        return next( new Error("invalid inputs",422));

    }
    const {username,email,city,profilePic}=req.body;
    console.log(req)
    const userid =req.params.username ;
    let useri;
    try{
        useri= await user.findOne({username:userid});

    }catch(err)
    {
        const error=new Error('no user with id',500)
        return next(error);
    }
    console.log(req.files)
    useri.username=username;
    useri.email=email;
    useri.city=city;
    if(!req.file)
    {
        console.log(req.body)
        console.log("fdsaf")
    useri.profilePic=profilePic;
    }else
    {
        useri.profilePic=req.file.filename
    }
    try{
        await useri.save();
    }
    catch(err)
    {
        const error=new Error('cannot update user',500)
        return next(error);    }
    res.status(200).json({user:useri});
}
const deleteUser=async(req,res,next)=>{
    const userName =req.params.username ;
    let useri;
    try{
        useri= await user.findOne({username:userName});
        console.log(useri)

    }catch(err)
    {
        const error=new Error('no user with id',500)
        return next(error);
    }

    try{
        await useri.remove();
    }
    catch(err)
    {
        const error=new Error('cannot delete user',500)
        return next(error);    }
    res.status(200).json({message:"deleted successfull"});
}
exports.addUser=addUser;
exports.getUsers=getUsers;
exports.getUserByUsername=getUserByUsername;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;