const Product = require('../../domain/entities/product');
const ProductDTO = require('../DTOs/product_dto');
const CreateProductUseCase = require('../../domain/usecases/create_product');
const GetProductUseCase = require('../../domain/usecases/get_product');
const GetAllProductsUseCase = require('../../domain/usecases/get_all_products');
const UpdateProductUseCase = require('../../domain/usecases/update_product');
const DeleteProductUseCase = require('../../domain/usecases/delete_product');

class ProductService {
    constructor(productRepository) {
        this.createProductUseCase = new CreateProductUseCase(productRepository);
        this.getProductUseCase = new GetProductUseCase(productRepository);
        this.getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
        this.updateProductUseCase = new UpdateProductUseCase(productRepository);
        this.deleteProductUseCase = new DeleteProductUseCase(productRepository);
    }

    async createProduct(productDto) {
        ProductDTO.validate(productDto);
        const product = new Product(null, productDto.name, productDto.price, productDto.description);
        return await this.createProductUseCase.execute(product);
    }

    async getProductById(id) {
        return await this.getProductUseCase.execute(id);
    }

    async getAllProducts() {
        return await this.getAllProductsUseCase.execute();
    }

    async updateProduct(id, productDto) {
        ProductDTO.validate(productDto);
        const product = new Product(id, productDto.name, productDto.price, productDto.description);
        return await this.updateProductUseCase.execute(id, product);
    }

    async deleteProduct(id) {
        return await this.deleteProductUseCase.execute(id);
    }
}

module.exports = ProductService;