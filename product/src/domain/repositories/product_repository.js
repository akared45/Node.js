class ProductRepository {
    async create()   { this._notImpl(); }
    async findById() { this._notImpl(); }
    async findAll()  { this._notImpl(); }
    async update()   { this._notImpl(); }
    async delete()   { this._notImpl(); }

    _notImpl() {
        throw new Error('Method not implemented');
    }
}

module.exports = ProductRepository;
