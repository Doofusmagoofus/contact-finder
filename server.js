//Init express server
const express = require('express');
const connectDB = require('./config/db');

//Init express in app
const app = express();

//Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//endpoint to test
app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the contact keeper api' })
);

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Dev port unless production
const PORT = process.env.PORT || 5000;

//Pass in port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
