const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers.js");

const Middleware = require("../middleware/auth.js");

router.post("/createUser", userController.createUser); // Creating Author Data ok

router.post("/login", userController.loginUser); //User login and generate token ok

module.exports = router;
