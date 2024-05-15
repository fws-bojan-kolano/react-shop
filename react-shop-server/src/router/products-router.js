const express = require('express');
const { productsController } = require('../controllers/products-controller');
const productsRouter = express.Router();

productsRouter
  .get('/products', productsController.productsControllerGet)
  .post('/products', productsController.productsControllerPost)
  .put('/products', productsController.productsControllerPut)
  .delete('/products', productsController.productsControllerDelete);

module.exports = {
    productsRouter,
};
