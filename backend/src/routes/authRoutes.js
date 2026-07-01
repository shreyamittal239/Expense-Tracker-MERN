const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

const {
    register,
    login,
    logout,
    getCurrentUser
} = require("../controller/authcontroller");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);



module.exports = router;