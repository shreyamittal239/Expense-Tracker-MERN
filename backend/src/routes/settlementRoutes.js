const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    settlePayment,
    getSettlementHistory,
} = require("../controller/settlementController");

router.post(
    "/",
    authMiddleware,
    settlePayment
);

router.get(
    "/:groupId",
    authMiddleware,
    getSettlementHistory
);

module.exports = router;