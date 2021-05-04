const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String},
    city:{type:String},
    profilePic:{type:String}
})
let user=mongoose.model('User',userSchema);
module.exports=user;
