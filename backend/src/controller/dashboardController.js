const Expense = require("../models/expense");
const mongoose = require("mongoose")

const getDashboard = async (req, res) => {
   const expenses = await Expense.find({
    user:req.user.id
   })

   let totalExpense = 0;

        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        });

    

 const categoryWiseExpense = await Expense.aggregate([
    {
        $match: {
            user:  new mongoose.Types.ObjectId(req.user.id)
        }
    },
    {
        $group: {
            _id: "$category",
            total: {
                $sum: "$amount"
            }
        }
    }
]);

const totalTransactions = expenses.length;
    

  const recentExpenses = await Expense.find({
     user:req.user.id
  })
  .sort({createdAt: -1})
  .limit(5);

  res.status(200).json({
            success: true,
            totalExpense,
            totalTransactions,
            recentExpenses,
            categoryWiseExpense
        });

};

module.exports = {
    getDashboard
};