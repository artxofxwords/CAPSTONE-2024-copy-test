const express = require("express");
const router = express.Router();
// const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/authorization");
//import proposal controller
const proposalController = require("../controllers/proposalController");

//GET ALL proposals
router.get("/displayAllProposal", proposalController.displayAllProposal);

// GET proposal by id
router.get("/displayProposal/:_id", proposalController.displayProposal);

// Create proposal
router.post("/createProposal", proposalController.createProposal);

// Update proposal with id
router.put("/updateProposal/:_id", proposalController.updateProposal);

// Delete proposal with id
router.delete("/deleteProposal/:_id", proposalController.deleteProposal); 

module.exports = router;