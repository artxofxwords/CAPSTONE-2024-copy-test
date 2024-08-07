const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
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
    console.log("User:", data);

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
