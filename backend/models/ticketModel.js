const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'in progress', 'resolved'],
  },
  responses: [
    {
      message: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
