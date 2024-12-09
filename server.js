const express = require('express');
// library to interact with mongodb.
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

// creates express app.
const app = express();
const PORT = 5000;

// Middleware to handle json.
app.use(bodyParser.json());

// connects to mongodb.
mongoose
.connect('mongodb+srv://jeff123:jeff123@testcluster.hayyt.mongodb.net/?retryWrites=true&w=majority&appName=testcluster', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));

// defines schema and model.
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const Item = mongoose.model('Item', ItemSchema);


// Routes
// finds all the documents in "/items" collection.
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// takes json data from "request body" to create a new item.
// then saves it in db.
app.post('/items', async (req, res) => {
const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
