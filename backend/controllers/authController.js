const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

module.exports.registerUser = async function (req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(401).json({ error: "User already exists, please log in." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        let token = jwt.sign({ username, email, id: newUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({ message: "User registered successfully", user: { username, email }, token });
    } catch (error) {
        res.status(400).json({ error: "Error creating user", details: error.message });
    }
};

module.exports.loginUser = async function (req, res) {
    let { usernameOrEmail, password } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        let token = jwt.sign({ username: user.username, email: user.email, id: user._id }, process.env.JWT_KEY, { expiresIn: '30d' });
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({ message: "Logged in successfully", user: { username: user.username, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err.message });
    }
};
