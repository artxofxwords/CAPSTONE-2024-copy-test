// Import the schema needed
require("dotenv").config();
const Proposal = require("../models/proposal");
var nodemailer = require("nodemailer");

exports.displayAllProposal = async (req, res) => {
  try {
    const allProposals = await Proposal.find();

    res.status(200).json(allProposals);
  } catch (err) {
    res.status(500).json("Error: Could not get proposal");
  }
};

exports.displayProposal = async (req, res) => {
  try {
    console.log(req.params);
    const foundProposal = await Proposal.findOne({ _id: req.params._id });

    res.status(200).json(foundProposal);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error: Could not get proposal");
  }
};

exports.createProposal = async (req, res) => {
  const {
    companyName,
    website,
    projectStarted,
    proposition,
    techRequirements,
    availabilityStart,
    availabilityEnd,
    contact,
    owner,
    category,
    status,
    read,
    updated
  } = req.body;

  try {
    const newProposal = new Proposal({
      companyName: companyName,
      website: website,
      projectStarted: projectStarted,
      proposition: proposition,
      techRequirements: techRequirements,
      availabilityStart: availabilityStart,
      availabilityEnd: availabilityEnd,
      contact: contact,
      owner: owner,
      category: category,
      status: status,
      read: read,
      updated: updated
    });

    const data = await newProposal.save();
    console.log("New Proposal", data);

    res.status(201).json("Proposal Submitted!");
  } catch (err) {
    console.log("err", err);
    console.log("Something went wrong. Proposal could not be created");
    res
      .status(500)
      .json("Error: Something went wrong. Proposal could not be created");
  }
};

exports.sendProposal = (req, res) => {
  const output = `
    <p>A new proposal has been submitted.</p>
    <h3>Proposal Info:</h3>
    <ul>
    <li>Company: ${req.body.companyName}</li>
    <li>Website: ${req.body.website}</li>
    <li>Tech Needed: ${req.body.techRequirements}</li>
    <li>Available Start Date: ${req.body.availabilityStart}</li>
    <li>Available End Date: ${req.body.availabilityEnd}</li>
    <li>Contact Info: ${req.body.contact}</li>
    </ul>
    <h3>Proposal:</h3>
    <p>${req.body.proposition}</p>
  `;

  const plaintextoutput = `
  A new proposal has been submitted.
    Proposal Info:
    
    Company: ${req.body.companyName}
    Website: ${req.body.website}
    Tech Needed: ${req.body.techRequirements}
    Available Start Date: ${req.body.availabilityStart}
    Available End Date: ${req.body.availabilityEnd}
    Contact Info: ${req.body.contact}
    
    Proposal:
    ${req.body.proposition}
  `;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uprightcapstone@gmail.com",
      pass: "nfdthiwrutgrubze",
    },
  });

  var mailOptions = {
    from: '"Upright Capstone" <uprightcapstone@gmail.com>',
    to: "brennan.amanda.j@gmail.com",
    subject: "New Proposal Submitted",
    text: plaintextoutput,
    html: output,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.updateProposal = async (req, res) => {
  if (req.user.isAdmin || req.user._id === req.params._id) {
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
        owner: req.body.owner,
        category: req.body.category,
        read: req.body.read,
        status: req.body.status,
        updated: req.body.updated
      };

      const data = await Proposal.findOneAndUpdate(
        { _id: req.params._id },
        replacingProposal
      );

      res.status(201).json(data);
    } catch (err) {
      console.log("Something went wrong. Could not update proposal");
      res
        .status(500)
        .json("Error: Something went wrong. Could not update proposal");
    }
  } else {
    res
      .status(400)
      .json("You do not have authorization to update this proposal.");
  }
};

exports.deleteProposal = async (req, res) => {
  if (req.user.isAdmin || req.user._id === req.params._id) {
    try {
      await Proposal.findByIdAndDelete(req.params._id);
      res.status(200).json(`Proposal removed`);
    } catch (err) {
      if (!foundProposal) {
        console.log(`Incorrect id. You cannot delete this proposal`);
        res.status(503).json(`Incorrect id cannot delete message`);
      } else {
        console.log(`Error Occured. Please try again`);
        res.status(500).json(`Error Occured. Please try again`);
      }
    }
  } else {
    res
      .status(400)
      .json("You do not have authorization to delete this proposal.");
  }
};

exports.displayUserProposal = async (req, res) => {
  try {
    const test = await Proposal.find({ owner: req.params.owner });

    res.status(200).json(test);
  } catch (err) {
    console.log(req.params.owner);
    res.status(500).json("Proposal Not Found");
  }
};
