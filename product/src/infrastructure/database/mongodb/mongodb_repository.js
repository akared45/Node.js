const mongoose = require('mongoose');
const ProductRepository = require('../../../domain/repositories/product_repository');
const Product = require('../../../domain/entities/product');
const logger = require('../../../shared/logger');
const config = require('../../config/mongodb_config');

class MongoDBProductRepository extends ProductRepository {
    constructor() {
        super();
        this.connect();
        this.ProductModel = mongoose.model('Product', new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String, required: true }
        }));
    }

    async connect() {
        try {
            await mongoose.connect(config.mongodb.url);
            logger.info('MongoDB connected');
        } catch (error) {
            logger.error(`MongoDB connection error: ${error.message}`);
            throw error;
        }
    }

    async create(product) {
        try {
            const productDoc = new this.ProductModel({
                name: product.name,
                price: product.price,
                description: product.description
            });
            const savedProduct = await productDoc.save();
            logger.info(`Product created: ${product.name}`);
            return new Product(savedProduct._id, savedProduct.name, savedProduct.price, savedProduct.description);
        } catch (error) {
            logger.error(`Failed to create product: ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        try {
            const productDoc = await this.ProductModel.findById(id);
            if (!productDoc) {
                logger.error(`Product not found: ${id}`);
                return null;
            }
            logger.info(`Product retrieved: ${id}`);
            return new Product(productDoc._id, productDoc.name, productDoc.price, productDoc.description);
        } catch (error) {
            logger.error(`Failed to find product: ${error.message}`);
            throw error;
        }
    }

    async findAll() {
        try {
            const products = await this.ProductModel.find();
            logger.info(`Retrieved all products`);
            return products.map(doc => new Product(doc._id, doc.name, doc.price, doc.description));
        } catch (error) {
            logger.error(`Failed to retrieve products: ${error.message}`);
            throw error;
        }
    }

    async update(id, product) {
        try {
            const productDoc = await this.ProductModel.findByIdAndUpdate(
                id,
                { name: product.name, price: product.price, description: product.description },
                { new: true }
            );
            if (!productDoc) {
                logger.error(`Product not found for update: ${id}`);
                return null;
            }
            logger.info(`Product updated: ${id}`);
            return new Product(productDoc._id, productDoc.name, productDoc.price, productDoc.description);
        } catch (error) {
            logger.error(`Failed to update product: ${error.message}`);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.ProductModel.findByIdAndDelete(id);
            if (!result) {
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

module.exports = MongoDBProductRepository;
