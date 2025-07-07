class ProductDTO {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    static validate(dto) {
        if (!dto.name || typeof dto.name !== 'string') {
            throw new Error('Name is required and must be a string');
        }
        if (!dto.price || typeof dto.price !== 'number' || dto.price <= 0) {
            throw new Error('Price is required and must be a positive number');
        }
        if (!dto.description || typeof dto.description !== 'string') {
            throw new Error('Description is required and must be a string');
        }
    }
}

module.exports = ProductDTO;