const CarService = require('../../application/services/carServices');
const CarImpl = require('../repositories/carImp');

class CarController {
  constructor() {
    this.carRepository = new CarImpl();
    this.carService = new CarService(this.carRepository);
  }

  initialize() {
    return this.carRepository.initialize();
  }

  createCar(req, res) {
    this.carService.createCar(req.body)
      .then(car => res.status(201).json(car))
      .catch(error => res.status(400).json({ error: error.message }));
  }

  getCar(req, res) {
    this.carService.getCar(req.params.id)
      .then(car => res.status(200).json(car))
      .catch(error => res.status(404).json({ error: error.message }));
  }

  getAllCars(req, res) {
    this.carService.getAllCars()
      .then(cars => res.status(200).json(cars))
      .catch(error => res.status(400).json({ error: error.message }));
  }

  updateCar(req, res) {
    this.carService.updateCar(req.params.id, req.body)
      .then(car => res.status(200).json(car))
      .catch(error => res.status(404).json({ error: error.message }));
  }

  deleteCar(req, res) {
    this.carService.deleteCar(req.params.id)
      .then(() => res.status(204).send())
      .catch(error => res.status(404).json({ error: error.message }));
  }
}

module.exports = CarController;