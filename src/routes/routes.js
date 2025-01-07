const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers.js");
const {
  createTicket,
  fetchTickets,
} = require("../controllers/tambula.controller.js");

const verifyToken = require("../middleware/auth.js");

router.put("/update/:userId", userController.updateuser);

router.post("/createUser", userController.createUser); // Creating Author Data ok

router.post("/login", userController.loginUser); //User login and generate token ok

// Generate Tambula Tickets
router.post("/createTicket", verifyToken, createTicket);

// Fetch Ticket API
router.get("/tickets/:userId", verifyToken, fetchTickets);

module.exports = router;
