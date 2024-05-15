const { usersRouter } = require('./users-router');
const { productsRouter } = require('./products-router');
const { emailRouter } = require('./email-router');

module.exports = {
  router: [usersRouter, productsRouter, emailRouter],
};
