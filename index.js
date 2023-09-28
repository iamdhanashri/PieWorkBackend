const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;


app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect('mongodb+srv://dhanashri:ahire@cluster0.1t4wpeq.mongodb.net/pieworks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const weatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
});

const Weather = mongoose.model('Weather', weatherSchema);


app.post('/api/weather', async (req, res) => {
  try {
    const { name, location, temperature } = req.body;
    const weather = new Weather({ name, location, temperature });
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    console.error('MongoDB error:', error);
    res.status(500).json({ error: 'Failed to create a weather entry' });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const weatherEntries = await Weather.find();
    res.status(200).json(weatherEntries);
  } catch (error) {
    console.error('MongoDB error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.put('/api/weather/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, temperature } = req.body;
    const updatedWeather = await Weather.findByIdAndUpdate(id, { name, location, temperature }, { new: true });
    res.status(200).json(updatedWeather);
  } catch (error) {
    console.error('MongoDB error:', error);
    res.status(500).json({ error: 'Failed to update weather entry' });
  }
});

app.delete('/api/weather/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Weather.findByIdAndDelete(id);
    res.status(200).json({ message: 'Weather entry deleted successfully' });
  } catch (error) {
    console.error('MongoDB error:', error);
    res.status(500).json({ error: 'Failed to delete weather entry' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
