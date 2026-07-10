const Budget = require("../models/budget")

const setBudget = async ( req , body ) => {
    try {
    const {amount } = req.body;

    if ( !amount) {
         return res.status(400)({
            success : false ,
            message: "Budget amount is required",
         });
    } 

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    let budget = await Budget.findOne({
        user : req.user.id,
        month,
        year,
    });
     if (budget) {
            budget.amount = amount;
            await budget.save();
        } else {
            budget = await Budget.create({
                amount,
                month,
                year,
                user: req.user.id,
            });
        }

        res.status(200).json({
            success: true,
            message: "Budget saved successfully",
            budget,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
}
} 

const getBudget = async ( req , res) => {
    try {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const budget = await Budget.findOne({
            user: req.user.id,
            month,
            year,
        });

        res.status(200).json({
            success:true,
            budget,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

const deleteBudget = async (req, res) => {
    try {
        await Budget.findOneAndDelete({
            user: req.user.id,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        });

        res.status(200).json({
            success: true,
            message: "Budget deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    setBudget,
    getBudget,
    deleteBudget,
};