const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");
require("dotenv").config();

// Login user controller
exports.loginUser = async (req, res) => {
    const password = req.body.password
    const username = req.body.username

    const userFound = await user.findOne({ username: username });

    const hashedPasswordFromUser = userFound.password

    bcrypt.compare(password, hashedPasswordFromUser, (err, result) => {
        if (result) {
            const payload = {
                id: userFound._id,
                isAdmin: userFound.isAdmin
            };
            const signedJWT = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 43200 })

            res.status(201).json({ message: "Login Succesful", token: signedJWT, loggedIn: true, user: userFound })
        } else {
            res.status(204).json("Login Failed")
        }
    })
};


// register user controller
exports.registerUser = async (req, res) => {
    const saltRounds = 10;
    const { username, password, firstName, lastName, email, companyName, city, state, company } = req.body;
    let isAdmin = false;
    console.log(username)
    if (email.includes(process.env.admin)) {
        isAdmin = true;
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = new user({ username: username, password: hash, firstName: firstName, lastName: lastName, email: email, companyName: companyName, city: city, state: state, isAdmin: isAdmin, company: company })
    
        try {
            await newUser.save();

            res.status(201).json("User Registered");
        } catch (err) {
            res.status(500).json("Could not register User!");
        }
    })
};

// delete user controller
exports.deleteUser = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id);

        res.status(200).json("User Deleted!")
    } catch (err) {
        res.status(500).json("Could not delete user!")
    }
};

// update user controller
exports.updateUser = async (req, res) => {
    try {
        const changeUser = new UserActivation({
            _id: req.params._id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            companyName: req.body.companyName,
            city: req.body.city,
            state: req.body.state
        })

        await user.findOneAndUpdate({ _id: req.params._id }, changeUser)

        res.status(200).json("User Updated!")
    } catch (err) {
        res.status(500).json("User could not be updated!")
    }
};

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        await user.find({});

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json("Could not get all users!")
    }
};

exports.getUserById = async (req, res) => {
    try {
        const data = await user.findById(req.params._id);
        
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json("Could not find user!")
    }
};

exports.getUserbyUsername = async (req, res) => {
    try {
        await user.find({username: req.params.username});

        res.status(200).json("User exists.")
    } catch (err) {
        res.status(500).json("Could not find user!")
    }
};