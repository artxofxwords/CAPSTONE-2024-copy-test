const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }, 
    website: {
        type: String
    },
    // Seeing if project is in progress
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
        type: Boolean,
        default: false
    }, 
    categorySoftwareDevelopment: {
        type: Boolean,
        default: false
    },
    categoryDataAnalytics: {
        type: Boolean,
        default: false
    },
    categoryDigitalMarketing: {
        type: Boolean,
        default: false
    },
    categoryUxUi: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }, 
    // Project Status
    approvedStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    underReviewStatus: {
        type: Boolean,
        required: true,
        default: false
    }, 
    submittedStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    deniedStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    ongoingStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    owner: {
        type: String,
        requried: true
    }
});

module.exports = mongoose.model("Proposal", proposalSchema);