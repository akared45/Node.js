class CarDTO {
    constructor(car) {
        this.id = car.id;
        this.brand = car.brand;
        this.model = car.model;
        this.year = car.year;
        this.price = car.price;
    }

    static fromRequest(data) {
        if (!data.brand || !data.model || !data.year || !data.price) {
            throw new Error('Missing required fields: brand, model, year, price');
        }
        if (typeof data.year !== 'number' || data.year < 1886 || data.year > new Date().getFullYear() + 1) {
            throw new Error('Invalid year');
        }
        if (typeof data.price !== 'number' || data.price < 0) {
            throw new Error('Invalid price');
        }

        return {
            brand: data.brand,
            model: data.model,
            year: data.year,
            price: data.price
        };
    }
}

module.exports = CarDTO;