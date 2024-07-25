const jwt = require("jsonwebtoken");
require("dotenv").config();

function authentication (req, res, next) {
    const token = req.header("Authorization").replace("Bearer ", '');

    if (!token) {
        return res.status(400).json({ message: "Access denied!" });
    }

    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body._id = verifyToken.id;
        req.body.isAdmin = verifyToken.isAdmin;
        console.log(`Auth User Id: ${req.body._id}, Admin Status: ${req.body.isAdmin}`);

        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token "});
    }
};

module.exports = authentication;