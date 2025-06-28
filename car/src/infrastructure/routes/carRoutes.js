const express = require('express');
const CarController = require('../controllers/carController');

const router = express.Router();
const carController = new CarController();

router.post('/cars', (req, res) => carController.createCar(req, res));
router.get('/cars/:id', (req, res) => carController.getCar(req, res));
router.get('/cars', (req, res) => carController.getAllCars(req, res));
router.put('/cars/:id', (req, res) => carController.updateCar(req, res));
router.delete('/cars/:id', (req, res) => carController.deleteCar(req, res));

module.exports = { router, carController };