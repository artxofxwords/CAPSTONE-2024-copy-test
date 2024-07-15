const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);

router.post("/register", userController.registerUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/getAll", userController.getAllUsers);

module.exports = router;