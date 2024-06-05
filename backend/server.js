require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.post('/tickets', async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.status(201).send(ticket);
});

app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});

app.get('/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.send(ticket);
});

app.put('/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(ticket);
});

app.post('/tickets/:id/respond', async (req, res) => {
  const { message } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  ticket.responses.push({ message });
  await ticket.save();
  console.log(`Would normally send email here with body: ${message}`);
  res.send(ticket);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
