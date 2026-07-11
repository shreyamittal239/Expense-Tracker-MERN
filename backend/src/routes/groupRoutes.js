const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createGroup,
    getGroups,
    getGroup,
    addMember
} = require("../controllers/groupController");

router.post("/", authMiddleware, createGroup);

router.get("/", authMiddleware, getGroups);

router.get("/:id", authMiddleware, getGroup);
router.post(
    "/:id/add-member",
    authMiddleware,
    addMember
);

module.exports = router;