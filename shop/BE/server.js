const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const productRoutes = require('./routes/productRoutes');
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use('/products', productRoutes);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
