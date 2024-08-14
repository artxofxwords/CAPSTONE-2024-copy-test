const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../middleware/authentication");

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.post("/forgotPassword", userController.forgotPassword);

router.post("/resetPassword", userController.resetPassword);

router.put("/:_id", authentication, userController.updateUser);

router.delete("/:_id", authentication, userController.deleteUser);

router.get("/getAll", userController.getAllUsers);

router.get("/check/:username", userController.getUserbyUsername);

router.get("/:_id", userController.getUserById);

module.exports = router;
