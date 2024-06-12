const express = require('express');
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  respondToTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.post('/:id/respond', respondToTicket);

module.exports = router;
