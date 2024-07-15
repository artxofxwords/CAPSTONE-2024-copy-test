const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
//import proposal controller
const proposalController = require("../controllers/proposalController");

//GET ALL proposals
router.get("/displayAllProposal", authentication, authorization, proposalController.displayAllProposal);

// GET proposal by id
router.get("/displayProposal/:id", authentication, authorization, proposalController.displayProposal);

// Create proposal
router.post("/createProposal", authentication, proposalController.createProposal);

// Update proposal with id
router.put("/updateProposal/:id", authentication, proposalController.updateProposal);

// Delete proposal with id
router.delete("/deleteProposal/:id", authentication, proposalController.deleteProposal); 

module.exports = router;