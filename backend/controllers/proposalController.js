// Import the schema needed
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Proposal = require("../models/proposal");

exports.displayAllProposal = async (req, res) => {
    // const yourJWTtoken = localStorage.getItem("token");

    try {

        const allProposals = await Proposal.find();
        console.log("AllProposals", allProposals);
            } catch (err) {
            console.log("Could not get proposal");
            res.status(500).json("Error: Could not get proposal");
        }
};

exports.displayProposal = async (req, res) => {

    try {

        const allProposals = await Proposal.find({proposalId: proposalId});
        for (let proposal in allProposals) {
            console.log(allProposals[proposal]);
            newUser = await User.findById({_id: allProposals[proposal].user_id});
            newProposal = {_id: allProposals[proposal]._id, user_id, companyName: allProposals[proposal].companyName, website: allProposals[proposal].website, projectStarted: allProposals[proposal].projectStarted,
                proposition: allProposals[proposal].proposition, techRequirements: allProposals[proposal].techRequirements, availabilityStart: allProposals[proposal].availabilityStart, availabilityEnd: allProposals[proposal].availabilityEnd,
                contact: allProposals[proposal].contact, owner: allProposals[proposal].owner}
            console.log(`Proposals to appear`, newProposal);
            allProposals.push(newProposal);
        }
        console.log(`${allProposals}`);
        res.status(200).json(allProposals);
            } catch (err) {
            console.log(err);
            console.log("Could not get proposal");
            res.status(500).json("Error: Could not get proposal");
        }
    }

exports.createProposal = async (req, res) => {
    const companyName = req.body.companyName
    const website = req.body.website
    const projectStarted = req.body.projectStarted
    const proposition = req.body.proposition
    const techRequirements = req.body.techRequirements
    const availabilityStart = req.body.availabilityStart
    const availabilityEnd = req.body.availabilityEnd
    const contact = req.body.contact
    const owner = req.body.owner;

    try {

            const newProposal = new Proposal({companyName: companyName, website: website, projectStarted: projectStarted, proposition: proposition, techRequirements: techRequirements,
                availabilityStart: availabilityStart, availabilityEnd: availabilityEnd, contact: contact, owner: owner});

                console.log(`Proposal Submitted: ${newProposal}`);
                const test = await newProposal.save();
                console.log("New Proposal", test);

                res.status(201).json("Proposal Submitted!")
        } catch (err)  {
            console.log("err", err);
            console.log("Something went wrong. Proposal could not be created");
            res.status(500).json("Error: Something went wrong. Proposal could not be created");
        }
    }


exports.updateProposal = async (req, res) => {

    try {

            const replacingProposal = {
                companyName: req.body.companyName,
                website: req.body.website,
                projectStarted: req.body.projectStarted,
                proposition: req.body.proposition,
                techRequirements: req.body.techRequirements,
                availabilityStart: req.body.availabilityStart,
                availabilityEnd: req.body.availabilityEnd,
                contact: req.body.contact,
                owner: req.body.owner
            }

            await Proposal.findOneAndUpdate({_id: req.params.id}, replacingProposal);

            res.status(201).json(replacingProposal);
        } catch (err) {
            console.log("Something went wrong. Could not update proposal");
            res.status(500).json("Error: Something went wrong. Could not update proposal");
        }
    };

exports.deleteProposal = async (req, res) => {
    try {
        await Proposal.findByIdAndDelete(req.params.id);
        res.status(200).json(`Proposal removed`)

    } catch (err) {
        if (!foundProposal) {
            console.log(`Incorrect id. You cannot delete this proposal`);
            res.status(503).json(`Incorrect id cannot delete message`);
        } else {
            console.log(`Error Occured. Please try again`);
            res.status(500).json(`Error Occured. Please try again`);
        }
    }
}