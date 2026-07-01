const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createSplitExpense,
    getSplitExpenses,
    deleteSplitExpense
} = require("../controller/splitExpenseController");

router.post("/", authMiddleware, createSplitExpense);

router.get("/", authMiddleware, getSplitExpenses);

router.delete("/:id", authMiddleware, deleteSplitExpense);

module.exports = router;