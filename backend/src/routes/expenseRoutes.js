const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")

const {
    addExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
} = require("../controller/expenseController")

router.post("/addExpense",authMiddleware , addExpense);
router.get("/", authMiddleware, getExpenses);

router.get("/:id", authMiddleware, getExpense);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;