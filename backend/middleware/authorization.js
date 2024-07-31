const User = require("../models/user");
const Proposal = require("../models/proposal");

function authorization (req, res, next) {
    if (req.user.isAdmin) {
        return next()
    }

    User.findById(req.params._id, (err, user) => {
        if (err || !user) {
            return res.status(404).json("User not found");
        }

        if (user._id === req.user._id) {
            return next();
        } else {
            return res.status(403).json("Access Denied");
        }
    })

    Proposal.findById(req.params._id, (err, proposal) => {
        if (err || !proposal) {
            return res.status(404).json("Proposal not found");
        }

        if (proposal.owner === req.user._id) {
            return next();
        } else {
            return res.status(403).json("Access Denied");
        }
    })
};

module.exports = authorization;