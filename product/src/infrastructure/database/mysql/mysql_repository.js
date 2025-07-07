const mysql = require('mysql2/promise');
const ProductRepository = require('../../../domain/repositories/product_repository');
const Product = require('../../../domain/entities/product');
const logger = require('../../../shared/logger');
const config = require('../../config/sql_config');

class SQLProductRepository extends ProductRepository {
    constructor() {
        super();
        this.pool = mysql.createPool(config.sql);
    }

    async create(product) {
        try {
            const [result] = await this.pool.query(
                'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
                [product.name, product.price, product.description]
            );
            logger.info(`Product created: ${product.name}`);
            return new Product(result.insertId, product.name, product.price, product.description);
        } catch (error) {
            logger.error(`Failed to create product: ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM products WHERE id = ?', [id]);
            if (rows.length === 0) {
                logger.error(`Product not found: ${id}`);
                return null;
            }
            logger.info(`Product retrieved: ${id}`);
            const product = rows[0];
            return new Product(product.id, product.name, product.price, product.description);
        } catch (error) {
            logger.error(`Failed to find product: ${error.message}`);
            throw error;
        }
    }

    async findAll() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM products');
            logger.info(`Retrieved all products`);
            return rows.map(row => new Product(row.id, row.name, row.price, row.description));
        } catch (error) {
            logger.error(`Failed to retrieve products: ${error.message}`);
            throw error;
        }
    }

    async update(id, product) {
        try {
            const [result] = await this.pool.query(
                'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
                [product.name, product.price, product.description, id]
            );
            if (result.affectedRows === 0) {
                logger.error(`Product not found for update: ${id}`);
                return null;
            }
            logger.info(`Product updated: ${id}`);
            return new Product(id, product.name, product.price, product.description);
        } catch (error) {
            logger.error(`Failed to update product: ${error.message}`);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM products WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                logger.error(`Product not found for deletion: ${id}`);
                return false;
            }
            logger.info(`Product deleted: ${id}`);
            return true;
        } catch (error) {
            logger.error(`Failed to delete product: ${error.message}`);
            throw error;
        }
    }
}

module.exports = SQLProductRepository;