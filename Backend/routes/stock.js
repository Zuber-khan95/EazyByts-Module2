import express from 'express'
import Stock from "../Model/stock.js"
import ExpressError from '../ExpressError.js';
// import { FaDiagramSuccessor } from 'react-icons/fa6';
const router=express.Router();

router.get("/",async(req,res,next)=>{
    try{
let stocks=await Stock.find({});
if(!stocks)
{
    throw new ExpressError("No such data found",404);
}

res.json({data:stocks});
    }
    catch(err)
    {
      next(new ExpressError("Internal Server Error",500));
    }
});

router.post("/new",async( req,res,next)=>{
    try{
const newStock=new Stock(req.body);
if(!newStock)
{
    throw new ExpressError("Stock can not be added.",404);
}
await newStock.save();
res.json({state:"success",message:"Succesfully Added the stock."});
    }
    catch(err)
    {
        next(new ExpressError("Internal Server Error",500));  
    }
});

router.put("/:id",async(req,res,next)=>{
    let {id}=req.params;
    try{
        const currStock=await Stock.findById(id);
        if(!currStock)
        {
            throw new ExpressError("Unable to find this stock",404);
        }
let updatedStock=await Stock.findByIdAndUpdate(id,{previousPrice:currStock.currentPrice,
    currentPrice:req.body.currentPrice,
    totalVolume:req.body.totalVolume,
    $push:{
        history:{
            date:req.body.date,
        }
    }
},{new:true
});
if(!updatedStock){
    throw new ExpressError("Unable to update this stock",404);
}
res.json({state:"success",message:"Succesfully Updated the stock."});
    }
    catch(err)
    {
        next(new ExpressError("Internal Server Error",500));  
    }
});

router.delete("/:id",async(req,res,next)=>{
    let { id }=req.params;
    try{
      let deletedStock=await Stock.findByIdAndDelete(id);
      if(!deletedStock)
      {
        throw new ExpressError("unable to delete this stock",404);
      }
      res.json({state:"success",message:"Succesfully deleted the stock."});
    }
    catch(err)
    {
        next(new ExpressError("Internal Server Error",500));  
    }
})

export default router;