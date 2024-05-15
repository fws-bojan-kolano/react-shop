const fs = require('fs');

const getProducts = () => {
  return JSON.parse(fs.readFileSync('data/products.json', {encoding: 'utf-8'}))
}

const productsControllerGet = async (req, res) => {
  res.send({ products: getProducts() });
};

const productsControllerPost = async (req, res) => {
  const { body: newProduct } = req;

  try {
    const productsData = getProducts();
    productsData.push(newProduct);
    fs.writeFileSync('data/products.json', JSON.stringify(productsData, null, 2));
    res.send({ message: 'Created new product!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create product.' });
  }
};

const productsControllerPut = async (req, res) => {
  const productsData = getProducts();
  const newData = [...productsData];
  const foundIndex = [...newData].findIndex(
    (product) => product.id === req.body.id
  );
  if (!foundIndex === -1) {
    return res.status(404).send({ message: 'Product not found!' });
  }

  newData[foundIndex] = req.body;
  fs.writeFileSync('data/products.json', JSON.stringify(newData, null, 2));
  return res.send({ message: 'Product updated!' });
};

const productsControllerDelete = async (req, res) => {
  const productsData = getProducts();
  const newData = [...productsData];
  const foundIndex = [...newData].findIndex(
    (product) => product.id === req.body.id
  );

  if (foundIndex === -1) {
    return res.status(404).send({ message: 'Product not found!' });
  }

  newData.splice(foundIndex, 1);
  fs.writeFileSync('data/products.json', JSON.stringify(newData, null, 2));
  return res.send({ message: 'Product Deleted!' });
};

module.exports = {
  productsController: {
    productsControllerGet,
    productsControllerPost,
    productsControllerPut,
    productsControllerDelete,
  },
};
