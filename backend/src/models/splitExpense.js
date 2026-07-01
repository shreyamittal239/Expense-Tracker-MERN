const mongoose = require("mongoose")

const participantSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        share : {
            type:Number,
            required:true,
        }
    }
);

const splitExpenseSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
         totalAmount : {
            type:Number,
            required:true,
         },

         participants:[participantSchema],

         createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
         }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("SplitExpense", splitExpenseSchema);