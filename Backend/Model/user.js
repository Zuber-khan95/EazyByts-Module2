import mongoose from 'mongoose'
import passposrtLocalMongoose from 'passport-local-mongoose'
const userSchema=mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "Stocks":[{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock' 
    }],
    "password":{
        type:String,
    },
  
});

userSchema.plugin(passposrtLocalMongoose);
const User=mongoose.model('User',userSchema);   
export default User;