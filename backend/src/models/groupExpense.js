const mongoose = require("mongoose");

const groupExpenseSchema = new mongoose.Schema(
{
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true,
    },

    title:{
        type:String,
        required:true,
        trim:true,
    },

    amount:{
        type:Number,
        required:true,
    },

    paidBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],

    description:{
        type:String,
        default:"",
    },

    date:{
        type:Date,
        default:Date.now,
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model(
    "GroupExpense",
    groupExpenseSchema
);