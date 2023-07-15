const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Replace with your actual MongoDB connection string
const uri = 'mongodb+srv://madmax:6n3RPpnR8XMtGnK@Cluster0.mongodb.net/your_database?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB!');
});

// Define a Mongoose schema for stories
const storySchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Create a Mongoose model from the schema
const Story = mongoose.model('Story', storySchema);

// Initialize Express
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for allowing CORS
app.use(cors());

// Define your API endpoints
app.get('/stories', async (req, res) => {
    const stories = await Story.find();
    res.json(stories);
});

app.post('/stories', async (req, res) => {
    const newStory = new Story(req.body);
    await newStory.save();
    res.json(newStory);
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
