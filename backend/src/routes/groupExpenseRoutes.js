const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addGroupExpense,
    getGroupExpenses,
    deleteGroupExpense,
    getGroupBalances
} = require("../controller/groupExpenseController");

// Add a new group expense
router.post(
    "/",
    authMiddleware,
    addGroupExpense
);

// Get all expenses of a group
router.get(
    "/:groupId",
    authMiddleware,
    getGroupExpenses
);

// Delete an expense
router.delete(
    "/:id",
    authMiddleware,
    deleteGroupExpense
);
router.get(
    "/balances/:groupId",
    authMiddleware,
    getGroupBalances
);

module.exports = router;