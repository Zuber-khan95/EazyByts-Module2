import mongoose from 'mongoose';
const stockSchema=mongoose.Schema({
    "symbol":{
        type:String,
        required:true
    },
    "companyName":{
        type:String,
        required:true
    },
    "previousPrice":{
        type:Number,
        required:true
    },
    "currentPrice":{
        type:Number,
        required:true
    },
    "totalVolume":{
        type:Number,
        required:true
    },
    "history":[{
        "date":{
            type:Date,
            default:Date.now()
        },
        "price":{
            type:Number
        }
    }],
    "date":{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const Stock=mongoose.model('Stock',stockSchema);
export default Stock;