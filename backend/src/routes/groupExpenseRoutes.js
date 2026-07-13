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

router.get(
    "/balances/:groupId",
    authMiddleware,
    getGroupBalances
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


module.exports = router;