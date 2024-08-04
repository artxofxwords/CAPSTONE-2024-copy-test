// Import the schema needed
require("dotenv").config();
const Proposal = require("../models/proposal");
var nodemailer = require("nodemailer");

exports.displayAllProposal = async (req, res) => {
  try {
    const allProposals = await Proposal.find();
    console.log("AllProposals", allProposals);
    res.status(200).json(allProposals);
  } catch (err) {
    res.status(500).json("Error: Could not get proposal");
  }
};

exports.displayProposal = async (req, res) => {
  try {
    console.log(req.params);
    const allProposals = await Proposal.findOne({ _id: req.params._id });

    console.log(`${allProposals}`);
    res.status(200).json(allProposals);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error: Could not get proposal");
  }
};

exports.createProposal = async (req, res) => {
  const companyName = req.body.companyName;
  const website = req.body.website;
  const projectStarted = req.body.projectStarted;
  const proposition = req.body.proposition;
  const techRequirements = req.body.techRequirements;
  const availabilityStart = req.body.availabilityStart;
  const availabilityEnd = req.body.availabilityEnd;
  const contact = req.body.contact;
  const owner = req.body.owner;
  const category = req.body.category;
  const categorySoftwareDevelopment = req.body.categorySoftwareDevelopment;
  const categoryDataAnalytics = req.body.categoryDataAnalytics;
  const categoryDigitalMarketing = req.body.categoryDigitalMarketing;
  const categoryUxUi = req.body.categoryUxUi;

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
      categorySoftwareDevelopment: categorySoftwareDevelopment,
      categoryDataAnalytics: categoryDataAnalytics,
      categoryDigitalMarketing: categoryDigitalMarketing,
      categoryUxUi: categoryUxUi,
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
    <p>You have a new proposal submitted.</p>
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
  You have a new proposal submitted.
    Proposal Info:
    
    Company: ${req.body.companyName}
    Website: ${req.body.website}
    Tech Needed: ${req.body.techRequirements}
    Available Start Date: ${req.body.availabilityStart}
    Available End Date: ${req.body.availabilityEnd}
    Contact Info: ${req.body.contact}
    
    Proposal:
    ${req.body.proposition}
  `

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uprightcapstone@gmail.com',
      pass: 'nfdthiwrutgrubze'
    }
  });
  
  var mailOptions = {
    from: '"Upright Capstone" <uprightcapstone@gmail.com>',
    to: 'brennan.amanda.j@gmail.com',
    subject: 'New Proposal Submitted',
    text: plaintextoutput,
    html: output
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

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
        categorySoftwareDevelopment: req.body.categorySoftwareDevelopment,
        categoryDataAnalytics: req.body.categoryDataAnalytics,
        categoryDigitalMarketing: req.body.categoryDigitalMarketing,
        categoryUxUi: req.body.categoryUxUi,
        read: req.body.read,
        approvedStatus: req.body.approvedStatus,
        underReviewStatus: req.body.underReviewStatus,
        submittedStatus: req.body.submittedStatus,
        deniedStatus: req.body.deniedStatus,
        ongoingStatus: req.body.ongoingStatus,
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
