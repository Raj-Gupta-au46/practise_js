const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticketData: {
    type: [
      {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    ],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
