class UpdateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async execute(id, product) {
        return await this.productRepository.update(id, product);
    }
}

module.exports = UpdateProductUseCase;