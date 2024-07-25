const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.put("/:_id", userController.updateUser);

router.delete("/:_id", userController.deleteUser);

router.get("/getAll", userController.getAllUsers);

router.get("/:_id", userController.getUserById);

router.get("/:username", userController.getUserbyUsername);

module.exports = router;