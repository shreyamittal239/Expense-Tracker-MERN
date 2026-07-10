const Budget = require("../models/budget")
const Expense = require("../models/Expense");

const setBudget = async ( req , res ) => {
    try {
    const {amount } = req.body;

    if ( !amount) {
         return res.status(400).json({
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

       

        const startDate = new Date(year, month - 1, 1);
const endDate = new Date(year, month, 1);

const expenses = await Expense.aggregate([
    {
        $match: {
            user: req.user.id,
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        },
    },
    {
        $group: {
            _id: null,
            totalSpent: {
                $sum: "$amount",
            },
        },
    },
]);

   const totalSpent =
    expenses.length > 0
        ? expenses[0].totalSpent
        : 0;


        const remaining = budget
    ? budget.amount - totalSpent
    : 0;

    const percentage = budget
    ? Math.min(
          (totalSpent / budget.amount) * 100,
          100
      )
    : 0;

     res.status(200).json({
            success: true,
            message: "Budget saved successfully",
            budget,
            totalSpent,
            remaining,
            percentage,
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