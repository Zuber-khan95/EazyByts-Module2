import express from 'express';
import passport from 'passport';        
import passportLocal from 'passport-local';
import User from '../Model/user.js';
import ExpressError from '../ExpressError.js';      
const router=express.Router();
import { Navigate } from 'react-router-dom';

router.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            throw new ExpressError("Missing required fields", 400);
        }
        const registeredUser = await User.register(new User({username,email}), password);
        
        await new Promise((res, error) => {
            req.login(registeredUser, (err) => {
                if (err) return error(err);
                res();
            });
        });
        const safeUser = {
            id: registeredUser._id,
            username: registeredUser.username,
            email: registeredUser.email
        };
        
        res.json({ user: safeUser, message: "Registration successful" });
    } catch (err) {
        if (err.name === 'UserExistsError') {
            return next(new ExpressError("Username already taken", 400));
        }
        next(new ExpressError("Registration failed", 500));
    }
});

// router.post("/login",passport.authenticate("local"),(req,res,next)=>{
//   try{
// res.json({state:"success"});
//   }
//   catch(err)
//   {
//     next(new ExpressError("Internal Server Error", 500));
//   }
// });

router.post("/logout",(req,res,next)=>{
// req.logout((err)=>{
//     if(err){
//         next(new ExpressError("Internal Server Error", 500));
//     }
// }
// );

    req.session.destroy((err)=>{
        if(err){
            next(new ExpressError("Unable to logged out"));
        }

    });
    res.clearCookie('connect.sid');
    res.json({state:"success", message:"logged out"});


});


export default router;