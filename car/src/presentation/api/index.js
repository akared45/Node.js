const express = require('express');
const { router, carController } = require('../../infrastructure/routes/carRoutes');
const config = require('../../infrastructure/config/config');

const app = express();
app.use(express.json());
app.use('/api', router);
function startServer() {
  carController.initialize()
    .then(() => {
      app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
      });
    })
    .catch(error => {
      console.error('Server failed to start:', error.message);
      process.exit(1);
    });
}

startServer();