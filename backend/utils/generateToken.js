const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { username: user.username, email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
    );
};

module.exports.generateToken = generateToken;
