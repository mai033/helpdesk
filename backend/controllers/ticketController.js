const Ticket = require('../models/ticketModel');

const getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
};

const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.send(ticket);
};

const createTicket = async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.status(201).send(ticket);
};

const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(ticket);
};

const respondToTicket = async (req, res) => {
  const { message } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  ticket.responses.push({ message });
  await ticket.save();
  console.log(`Would normally send email here with body: ${message}`);
  res.send(ticket);
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  respondToTicket,
};
