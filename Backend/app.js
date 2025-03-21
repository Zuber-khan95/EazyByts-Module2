import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
const app=express();
app.use(express.json());
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from './Model/user.js'

import stock from './routes/stock.js';
import users from './routes/users.js';
import portfolio from "./routes/portfolio.js"

import ExpressError from './ExpressError.js';

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

let PORT=process.env.PORT||8080;
app.listen(PORT,(req,res)=>{
    console.log("Listening the port:",PORT);
})

mongoose.connect("mongodb://localhost:27017/stockInsight").then((res)=>{console.log("connected");})
.catch((err)=>{console.log(err)});

app.use((req,res,next,err)=>{
    let {status=500,message="Something went wrong"}=err;
    res.status(status).send(message);
});

app.use(session({
    secret:process.env.SESSION_SECRET||"mysupersecretcode",
    resave:false,   
    saveUninitialized:false,
    Cookie:{
        expire:Date.now()+3*24*60*60*1000,
        maxAge:3*24*60*60*1000,
        sameSite:true,
        secure:false                                        

    }
}));
passport.use(new passportLocal.Strategy(User.authenticate()));
app.use(passport.initialize());     
app.use(passport.session());
passport.serializeUser((User,done)=>{           
    done(null,User);
});
passport.deserializeUser((User,done)=>{
    done(null,User);
});

app.use("/stock",stock);
app.use("/",users);
app.use("/portfolio",portfolio);