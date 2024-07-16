const jwt = require("jsonwebtoken");

function authentication (req, res, next) {
    const token = req.header("Authorization").replace("Bearer ", '');

    if (!token) {
        return res.status(400).json({ message: "Access denied!" });
    }

    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body._id = verifyToken.id;
        req.body.isAdmin = verifyToken.isAdminl
        console.log(`User Id: ${req.body._id}, and status ${req.body.isAdmin}`);

        next()
    } catch (err) {
        res.status(400).json({ message: "Invalid token "});
    }
};

module.exports = authentication;