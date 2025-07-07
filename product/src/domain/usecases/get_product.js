class GetProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async execute(id) {
        return await this.productRepository.findById(id);
    }
}

module.exports = GetProductUseCase;