const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();


// Login user controller
exports.loginUser = async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;


  const userFound = await User.findOne({ username: username });

  if (!userFound) {
    res.status(301).json("User not created")
    console.log("User not created")
    return;
  }

  const hashedPasswordFromUser = userFound.password;
  
  
  bcrypt.compare(password, hashedPasswordFromUser, (err, result) => {
    if (result) {
      const payload = {
        _id: userFound._id,
        isAdmin: userFound.isAdmin,
      };
      const signedJWT = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 43200
      });

      res
        .status(201)
        .json({
          message: "Login Successful",
          token: signedJWT,
          loggedIn: true,
          user: userFound
        });
    } else {
      res.status(204).json("Login Failed");
    }
  });
};

// register user controller
exports.registerUser = async (req, res) => {
  const saltRounds = 10;
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    companyName,
    city,
    state,
    company,
  } = req.body;
  let isAdmin = false;

  if (email === process.env.admin) {
    isAdmin = true;
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    const newUser = new User({
      username: username,
      password: hash,
      firstName: firstName,
      lastName: lastName,
      email: email,
      companyName: companyName,
      city: city,
      state: state,
      isAdmin: isAdmin,
      company: company,
    });

    try {
      await newUser.save();

      res.status(201).json("User Registered");
    } catch (err) {
      res.status(500).json("Could not register User!");
    }
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    //find the user by email
    const user = await User.findOne({email: req.body.email });

    //if user not found, send error message
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }

    //Generate a unique JWT token for the user that contains the user's id
    const token = jwt.sign({userId: user._id }, process.env.SECRET_KEY, {expiresIn: "10m",});

    //send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth: {
          user: "uprightcapstone@gmail.com",
          pass: "nfdthiwrutgrubze",
        },
        tls : {rejectUnauthorized: false}
    });

    //Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "ResetPassword",
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:<p>
      <a href="http://localhost:5173/resetPassword/?token=${token}">http://locakhost:5173/resetPassword/?token=${token}</a>
      <p>The link will expire in 10 minutes.<p>
      <p>If you didn't request a password reset, please nofity an addministator.<p>`,
    };

    //Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      res.status(200).send({message: "Email sent"});
    });
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

// delete user controller
exports.deleteUser = async (req, res) => {
  if (req.user.isAdmin || req.user._id === req.params._id) {
  try {
    await User.findByIdAndDelete(req.params._id);

    res.status(200).json("User Deleted!");
  } catch (err) {
    res.status(500).json("Could not delete user!");
  }
} else {
  res.status(400).json("You do not have authorization to delete this user.");
}
};

exports.resetPassword = async (req, res) => {
  try {
    //Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.body.token,
      process.env.SECRET_KEY
    );

    //If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({message: "Invalid token"});
    }

    //find the user with the id from the token
    const user = await User.findOne({_id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({message: "no user found"});
    }

    //has the new password
    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

    //Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    //Send success response
    res.status(201).send({message: "Password updated" });
  } catch (err) {
    //Send error response if any error occurs
    res.status(500).send({message: err.message});
  }
};

// update user controller
exports.updateUser = async (req, res) => {
  if (req.user.isAdmin || req.user._id === req.params._id) {
  try {
    const changeUser = new User({
      _id: req.params._id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      companyName: req.body.companyName,
      city: req.body.city,
      state: req.body.state,
      isAdmin: req.body.isAdmin
    });

    await User.findOneAndUpdate({ _id: req.params._id }, changeUser);

    res.status(200).json("User Updated!");
  } catch (err) {
    res.status(500).json("User could not be updated!");
  }
} else {
  res.status(400).json("You do not have authorization to delete this user.");
}
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Could not get all users!");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const data = await User.findById(req.params._id);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("Could not find user!");
  }
};

//get user by username
exports.getUserbyUsername = async (req, res) => {
  try {
    const userFound = await User.findOne({username: req.params.username});

    if (userFound === null) {
      return res.status(500).json("Username is available");
    }

    res.status(200).json(userFound);
  } catch (err) {
    res.status(500).json({ERROR: err.message});
  }
};
