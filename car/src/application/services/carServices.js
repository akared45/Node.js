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

    async createCar(data) {
        const carData = CarDTO.fromRequest(data);
        const car = await this.createCarUseCase.execute(carData);
        return new CarDTO(car); 
    }

    async getCar(id) {
        const car = await this.getCarUseCase.execute(id);
        return new CarDTO(car); 
    }

    async getAllCars() {
        const cars = await this.getCarUseCase.executeAll();
        return cars.map(car => new CarDTO(car)); 
    }

    async updateCar(id, data) {
        const carData = CarDTO.fromRequest(data);
        const updatedCar = await this.updateCarUseCase.execute(id, carData);
        return new CarDTO(updatedCar); 
    }

    async deleteCar(id) {
        return await this.deleteCarUseCase.execute(id);
    }
}

module.exports = CarService;
