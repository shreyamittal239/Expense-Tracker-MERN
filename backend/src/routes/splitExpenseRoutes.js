const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createSplitExpense,
    getSplitExpenses,
    deleteSplitExpense,
    updateSplitExpense,
    getSplitExpense
} = require("../controller/splitExpenseController");

router.post("/", authMiddleware, createSplitExpense);

router.get("/", authMiddleware, getSplitExpenses);

router.delete("/:id", authMiddleware, deleteSplitExpense);

router.get("/:id" , authMiddleware , getSplitExpense)

router.put("/:id" , authMiddleware , updateSplitExpense )

module.exports = router;