class GetCar {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    execute(id) {
        const car = this.carRepository.findById(id);
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }

    executeAll() {
        return this.carRepository.findAll();
    }
}

module.exports = GetCar;
