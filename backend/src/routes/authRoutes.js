const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const {
    register,
    login,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword
} = require("../controller/authcontroller");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post(
    "/reset-password/:token",
    resetPassword
);

module.exports = router;