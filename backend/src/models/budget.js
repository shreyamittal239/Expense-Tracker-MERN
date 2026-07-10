const mongooose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        amount : {
            type:number,
            required:true,
        },

        month :{
            type: Number,
            require: true,
        },

        year : {
            type:Number ,
            required : true ,
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
    },{
        timestamps : true,
    },
);

module.exports = mongoose.model("Budget" , budgetSchema)