const Product = require('../models/productModel');

module.exports = {
    getAllProducts: (req, res) => {
        Product.getAll((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },

    getProductById: (req, res) => {
        const { id } = req.params;
        Product.getById(id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).send('Product does not exist');
            res.json(results[0]);
        });
    },

    createProduct: (req, res) => {
        const product = req.body;
        const { Title, Price, IDate, Quantity } = product;
        if (!Title || !Price || !IDate || !Quantity) {
            return res.status(400).send('Please fill in complete product information');
        }

        Product.create(product, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(`Product added successfully with ID: ${results.insertId}`);
        });
    },

    updateProduct: (req, res) => {
        const { id } = req.params;
        const product = req.body;
        Product.update(id, product, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send('Product does not exist');
            res.send('Product updated successfully');
        });
    },

    deleteProduct: (req, res) => {
        const { id } = req.params;
        Product.delete(id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).send('Product does not exist');
            res.send('Product deleted successfully');
        });
    }
};
