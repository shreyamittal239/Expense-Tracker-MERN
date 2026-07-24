const Expense = require("../models/expense");
const { findOne } = require("../models/settlement");

const addExpense = async (req, res) => {
   const {
            title,
            amount,
            category,
            date,
            note,
         } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, amount and category are required",
            });
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            date,
            note,
            user: req.user.id,
        });
  console.log("Before emit");
      req.io.emit("expenseAdded", {
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
});
console.log("After emit");
        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense,
        });

        

};

const getExpenses = async (req, res) => {
  
    const expenses = await Expense.find({
        user:req.user.id
    }).sort({
            date: -1
        });

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });

};

const getExpense = async (req, res) => {
    const expense = await Expense.findOne({
        _id: req.params.id,
        user: req.user.id,
    });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.status(200).json({
            success: true,
            expense
        });
};

const updateExpense = async (req, res) => {
       const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        req.io.emit("expenseUpdated", {
    title: expense.title,
    amount: expense.amount,
});

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense,
        });

    
};

const deleteExpense = async (req, res) => {
      const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        await expense.deleteOne();
      
        req.io.emit("expenseDeleted", {
    title: expense.title,
});
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
};


module.exports = {
    addExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
   
};