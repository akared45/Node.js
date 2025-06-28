class DeleteCar {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  execute(id) {
    const result = this.carRepository.delete(id);
    if (!result) {
      throw new Error('Car not found');
    }
    return result;
  }
}

module.exports = DeleteCar;
