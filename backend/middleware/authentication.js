const jwt = require("jsonwebtoken");

async function authentication (req, res, next) {
    const token = req.header.authorization;

    if (!token) {
        return res.status(400).json("Access denied!");
    }

    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await user.findById(verifyToken._id); //set user info object

        req.user = user; //allow access for any route after "next()" to user info object by calling res.user

        console.log(`Auth User Id: ${req.user._id}, Admin Status: ${req.user.isAdmin}`);

        next();
    } catch (err) {
        res.status(400).json({ERROR: err.message});
    }
};

module.exports = authentication;