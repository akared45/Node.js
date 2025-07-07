const ProductService = require('../../application/services/product_service');
const ProductDTO = require('../../application/DTOs/product_dto');
const logger = require('../../shared/logger');

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async create(req, res) {
        try {
            const productDto = new ProductDTO(req.body.name, req.body.price, req.body.description);
            const product = await this.productService.createProduct(productDto);
            logger.info(`Product created via API: ${product.name}`);
            res.status(201).json(product);
        } catch (error) {
            logger.error(`Create product error: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (!product) {
                logger.error(`Product not found: ${req.params.id}`);
                return res.status(404).json({ error: 'Product not found' });
            }
            logger.info(`Product retrieved via API: ${req.params.id}`);
            res.json(product);
        } catch (error) {
            logger.error(`Get product error: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            logger.info(`Retrieved all products via API`);
            res.json(products);
        } catch (error) {
            logger.error(`Get all products error: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const productDto = new ProductDTO(req.body.name, req.body.price, req.body.description);
            const product = await this.productService.updateProduct(req.params.id, productDto);
            if (!product) {
                logger.error(`Product not found for update: ${req.params.id}`);
                return res.status(404).json({ error: 'Product not found' });
            }
            logger.info(`Product updated via API: ${req.params.id}`);
            res.json(product);
        } catch (error) {
            logger.error(`Update product error: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await this.productService.deleteProduct(req.params.id);
            if (!result) {
                logger.error(`Product not found for deletion: ${req.params.id}`);
                return res.status(404).json({ error: 'Product not found' });
            }
            logger.info(`Product deleted via API: ${req.params.id}`);
            res.status(204).send();
        } catch (error) {
            logger.error(`Delete product error: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ProductController;