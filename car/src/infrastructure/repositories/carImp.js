const CarRepository = require('../../domain/repositories/carRepository');
const Car = require('../../domain/entities/car');
const { initializeDatabase } = require('../database/connection');

class CarRepositoryImpl extends CarRepository {
    constructor() {
        super();
        this.connection = null;
    }

    initialize() {
        return initializeDatabase().then(connection => {
            this.connection = connection;
        }).catch(error => {
            throw error;
        });
    }

    findById(id) {
        return this.connection.query('SELECT * FROM cars WHERE id = ?', [id]).then(([rows]) => {
            if (rows.length === 0) return null;
            const car = rows[0];
            return new Car(car.id, car.brand, car.model, car.year, car.price);
        }).catch(error => {
            throw error;
        });
    }

    findAll() {
        return this.connection.query('SELECT * FROM cars').then(([rows]) => {
            return rows.map(car => new Car(car.id, car.brand, car.model, car.year, car.price));
        }).catch(error => {
            throw error;
        });
    }

    create(car) {
        return this.connection.query(
            'INSERT INTO cars (brand, model, year, price) VALUES (?, ?, ?, ?)',
            [car.brand, car.model, car.year, car.price]
        ).then(([result]) => {
            return new Car(result.insertId, car.brand, car.model, car.year, car.price);
        }).catch(error => {
            throw error;
        });
    }

    update(id, car) {
        return this.connection.query(
            'UPDATE cars SET brand = ?, model = ?, year = ?, price = ? WHERE id = ?',
            [car.brand, car.model, car.year, car.price, id]
        ).then(([result]) => {
            if (result.affectedRows === 0) return null;
            return new Car(id, car.brand, car.model, car.year, car.price);
        }).catch(error => {
            throw error;
        });
    }

    delete(id) {
        return this.connection.query('DELETE FROM cars WHERE id = ?', [id]).then(([result]) => {
            if (result.affectedRows === 0) return false;
            return true;
        }).catch(error => {
            throw error;
        });
    }
}

module.exports = CarRepositoryImpl;