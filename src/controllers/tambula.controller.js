const Ticket = require("../models/tambula.model.js");
const User = require("../models/user.model.js");
const generateTambulaTickets = require("../helper/index.js");
const { Types } = require("mongoose");

const createTicket = async (req, res) => {
  try {
    const { numberOfTicketSet, userId } = req.body;
    console.log(numberOfTicketSet);
    if (numberOfTicketSet <= 0) {
      return res
        .status(400)
        .json({ error: "Number of tickets must be greater than 0" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user);
    for (let i = 0; i < numberOfTicketSet; i++) {
      // console.log("forloop");
      console.log(generateTambulaTickets);
      const tickets = generateTambulaTickets();
      console.log(tickets);
      for (let [ticketId, data] of Object.entries(tickets)) {
        const ticketList = new Ticket({
          ticketData: data,
          user: user._id,
        });
        await ticketList.save();
      }
    }

    res.status(201).json({ message: "Ticket created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

const fetchTickets = async (req, res) => {
  const userId = new Types.ObjectId(String(req?.params?.userId));
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    // Get total count of tickets
    // const totalCount = await Ticket.aggregate([
    //   {
    //     $match: {
    //       user: userId,
    //     },
    //   },

    //   {
    //     $group: {
    //       _id: null,
    //       count: { $count: {} },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       count: 1,
    //     },
    //   },
    // ]);
    const totalCount = await Ticket.countDocuments({ user: userId });
    // Calculate pagination values
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    // Fetch ticket lists
    const tickets = await Ticket.find({ user: userId }).skip(skip).limit(limit);
    res.json({
      totalCount,
      totalPages,
      currentPage: page,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTicket, fetchTickets };
