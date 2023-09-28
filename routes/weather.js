const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Create a new weather entry
router.post('/', weatherController.createWeatherEntry);

// Retrieve all weather entries
router.get('/', weatherController.getAllWeatherEntries);

// Update a weather entry by ID
router.put('/:id', weatherController.updateWeatherEntry);

// Delete a weather entry by ID
router.delete('/:id', weatherController.deleteWeatherEntry);

module.exports = router;
