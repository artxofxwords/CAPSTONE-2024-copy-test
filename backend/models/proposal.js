const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }, 
    website: {
        type: String
    },
    projectStarted: {
        type: Boolean,
        default: false
    }, 
    proposition: {
        type: String,
        required: true
    },
    techRequirements: {
        type: String,
        required: true
    },
    availabilityStart: {
        type: String,
        required: true
    },
    availabilityEnd: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: false
    }, 
    read: {
        type: Boolean,
        required: true,
        default: false
    }, 
    updated: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        requried: true
    }
});

module.exports = mongoose.model("Proposal", proposalSchema);