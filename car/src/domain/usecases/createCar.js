const Car = require('../entities/car');
const { v4: uuidv4 } = require('uuid');

class CreateCar {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    execute(brand, model, year, price) {
        const id = uuidv4();
        const newCar = new Car(id, brand, model, year, price);
        return this.carRepository.save(newCar);
    }
}

module.exports = CreateCar;