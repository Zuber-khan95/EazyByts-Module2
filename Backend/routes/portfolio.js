import express from 'express'
import ExpressError from '../ExpressError.js';
import Stock from '../Model/stock.js'
import User from '../Model/user.js'
const router=express.Router();

router.get("/:userId",async(req,res,next)=>{
    let {userId}=req.params;
    try{
        const user=await User.findById(userId).populate("Stocks");
        if(!user)
        {
            next(new ExpressError("User not found",404));
        }
        res.json({user});
    }
    catch(err){
        next(new ExpressError("Internal Server Error",500));
    }
})

router.post('/:id/new/:userId',async(req,res,next)=>{
    let {id,userId}=req.params;
    try{
        const stock=await Stock.findById(id);
        if(!stock)
        {
            next( new ExpressError("This stock does not found.", 404));
        }
const user=await User.findById(userId);
if(!user)
{
    next( new ExpressError("This user does not found.", 404));
}

user.Stocks.push(stock);
await user.save();
res.json({state:"success",message:"Successfully Stock added."});

    }
    catch(err)
    {
        next(new ExpressError("Internal Server Error"));
    }
}); 

router.delete('/:stockId/:userId',async(req,res,next)=>{
    let {stockId,userId}=req.params;
    try{
        const stock=await Stock.findById(stockId);
        if(!stock)
        {
            next( new ExpressError("This stock does not found.", 404));
        }
        console.log(stock);
        const user=await User.findById(userId);
if(!user)
{
    next( new ExpressError("This user does not found.", 404));
}

const stockObjectId= new mongoose.Types.ObjectId(stockId);

const updatedUser=await User.findByIdAndUpdate( userId ,
    { $pull : { Stocks : stockObjectId }} , 
    { new: true });
console.log(updatedUser);
// user.Stocks.push(stock);
// await user.save();
res.json({state:"success",message:"Successfully Stock deleted."});
    }
    catch(err)
    {
        next(new ExpressError("Internal Server Error"));
    }
});



export default router;