require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.use('/tickets', ticketRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
