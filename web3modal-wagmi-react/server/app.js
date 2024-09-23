const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

// Connect to MongoDB
mongoose.connect('mongodb://mvt:mvt2023password@162.254.37.46:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple Mongoose schema
const addressSchema = new mongoose.Schema({
  address: String,
});

// Create a Mongoose model based on the schema
const AddressModel = mongoose.model('Address', addressSchema);

// Create an Express app
const app = express();
const port = 3003;

// Use the cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request body
app.use(express.json());

// Define a route to get all examples
app.get('/addresses', async (req, res) => {
  try {
    const addresses = await AddressModel.find();
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to create a new example
app.post('/address', async (req, res) => {
  try {
    const { address } =req.body; 
    const newAddress = new AddressModel({ address });
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express app
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
