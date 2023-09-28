const Weather = require('../models/Weather');

// Create a new weather entry
exports.createWeatherEntry = async (req, res) => {
  try {
    const { name, location, temperature } = req.body;
    const weather = await Weather.create({ name, location, temperature });
    res.status(201).json(weather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a weather entry' });
  }
};

// Retrieve all weather entries
exports.getAllWeatherEntries = async (req, res) => {
  try {
    const weatherEntries = await Weather.findAll();
    res.status(200).json(weatherEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Update a weather entry by ID
exports.updateWeatherEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, temperature } = req.body;
    const updatedWeather = await Weather.update(
      { name, location, temperature },
      { where: { id } }
    );
    res.status(200).json(updatedWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update weather entry' });
  }
};

// Delete a weather entry by ID
exports.deleteWeatherEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await Weather.destroy({ where: { id } });
    res.status(200).json({ message: 'Weather entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete weather entry' });
  }
};
