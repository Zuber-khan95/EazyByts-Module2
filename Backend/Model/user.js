import mongoose from 'mongoose'
import passposrtLocalMongoose from 'passport-local-mongoose'
import Stock from './stock.js';
const userSchema=mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:String,
    },
    "Stocks":[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stock'
    }],
});
userSchema.plugin(passposrtLocalMongoose);
const User=mongoose.model('User',userSchema);   
export default User;