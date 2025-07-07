const express = require('express');
const ProductController = require('../controllers/product_controller');
const ProductService = require('../../application/services/product_service');
const DatabaseFactory = require('../../infrastructure/db_factory');

module.exports = (app) => {
    const router = express.Router();
    const productRepository = DatabaseFactory.createRepository();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    router.post('/products', (req, res) => productController.create(req, res));
    router.get('/products/:id', (req, res) => productController.getById(req, res));
    router.get('/listproducts', (req, res) => productController.getAll(req, res));
    router.put('/products/:id', (req, res) => productController.update(req, res));
    router.delete('/products/:id', (req, res) => productController.delete(req, res));

    app.use('/api', router);
};