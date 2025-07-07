class GetAllProductsUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async execute() {
        return await this.productRepository.findAll();
    }
}

module.exports = GetAllProductsUseCase;