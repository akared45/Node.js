const CreateCar = require('../../domain/usecases/createCar');
const GetCar = require('../../domain/usecases/getCar');
const UpdateCar = require('../../domain/usecases/updateCar');
const DeleteCar = require('../../domain/usecases/deleteCar');
const CarDTO = require('../DTOs/carDTO');

class CarService {
    constructor(carRepository) {
        this.createCarUseCase = new CreateCar(carRepository);
        this.getCarUseCase = new GetCar(carRepository);
        this.updateCarUseCase = new UpdateCar(carRepository);
        this.deleteCarUseCase = new DeleteCar(carRepository);
    }

    createCar(data) {
        const carData = CarDTO.fromRequest(data);
        const car = this.createCarUseCase.execute(carData);
        return CarDTO.toResponse(car);
    }

    getCar(id) {
        const car = this.getCarUseCase.execute(id);
        return CarDTO.toResponse(car);
    }

    getAllCars() {
        const cars = this.getCarUseCase.executeAll();
        return cars.map(car => CarDTO.toResponse(car));
    }

    updateCar(id, data) {
        const carData = CarDTO.fromRequest(data);
        const updatedCar = this.updateCarUseCase.execute(id, carData);
        return CarDTO.toResponse(updatedCar);
    }

    deleteCar(id) {
        return this.deleteCarUseCase.execute(id);
    }
}

module.exports = CarService;
