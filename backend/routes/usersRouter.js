const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/", (req, res) => {
    res.send("API is working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/logout", (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
