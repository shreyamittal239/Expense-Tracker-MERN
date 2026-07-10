const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")

const {
    setBudget ,
    getBudget,
    deleteBudget,
} = require("../controller/budgetController")

router.post("/" ,authMiddleware, setBudget);
router.get("/", authMiddleware ,getBudget);
router.delete("/" ,authMiddleware, deleteBudget);

module.exports = router;