const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//import proposal controller
const proposalController = require("../controllers/proposalController");

//GET ALL proposals
router.get("/displayAllProposal", proposalController.displayAllProposal);

// GET proposal by id
router.get("/displayProposal/:_id", authentication, proposalController.displayProposal);

// Create proposal
router.post("/createProposal", authentication, proposalController.createProposal);

// Update proposal with id
router.put("/updateProposal/:_id", authentication, authorization, proposalController.updateProposal);

// Delete proposal with id
router.delete("/deleteProposal/:_id", authentication, authorization, proposalController.deleteProposal); 

module.exports = router;