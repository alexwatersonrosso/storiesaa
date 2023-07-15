const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => console.log('Server is running on port 3000'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alcoholic-autobiographies', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});
const Story = require('./models/Story');

app.post('/stories', async (req, res) => {
  const story = new Story(req.body);
  await story.save();
  res.send(story);
});

app.get('/stories', async (req, res) => {
  const stories = await Story.find();
  res.send(stories);
});

app.get('/stories/:id', async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.send(story);
});

app.put('/stories/:id', async (req, res) => {
  const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(story);
});

app.delete('/stories/:id', async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.send({ message: 'Story deleted' });
});
