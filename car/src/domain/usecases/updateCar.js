class UpdateCar {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    execute(id, { brand, model, year, price }) {
        const updatedCar = this.carRepository.update(id, { brand, model, year, price });
        if (!updatedCar) {
            throw new Error('Car not found');
        }
        return updatedCar;
    }
}

module.exports = UpdateCar;
