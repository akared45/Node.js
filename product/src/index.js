const express = require('express');
const routes = require('./presentation/routes/api');

const app = express();
app.use(express.json());

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});