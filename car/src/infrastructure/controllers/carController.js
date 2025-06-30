const CarService = require('../../application/services/carServices');
const CarImpl = require('../repositories/carImp');

class CarController {
  constructor() {
    this.carRepository = new CarImpl();
    this.carService = new CarService(this.carRepository);
  }

  async initialize() {
    return await this.carRepository.initialize();
  }

  async createCar(req, res) {
    try {
      const car = await this.carService.createCar(req.body);
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCar(req, res) {
    try {
      const car = await this.carService.getCar(req.params.id);
      res.status(200).json(car);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllCars(req, res) {
    try {
      const cars = await this.carService.getAllCars();
      res.status(200).json(cars);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCar(req, res) {
    try {
      const car = await this.carService.updateCar(req.params.id, req.body);
      res.status(200).json(car);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteCar(req, res) {
    try {
      await this.carService.deleteCar(req.params.id);
      res.status(204).send(); // 204: No Content
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = CarController;
