const Proposal = require("../models/proposal");

function authorization (req, res, next) {
    if (req.body.isAdmin) {
        return next()
    }

    Proposal.findById(req.params._id, (err, proposal) => {
        if (err || !proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }

        if (proposal.owner === req.body._id) {
            return next();
        } else {
            return res.status(404).json({ message: "Access Denied"})
        }
    })
};

module.exports = authorization;