const fs = require('fs');

const getUsers = () => {
  return JSON.parse(fs.readFileSync('data/users.json', {encoding: 'utf-8'}))
}

const usersControllerGet = async (req, res) => {
  res.send({ users: getUsers() });
};

const usersControllerPost = async (req, res) => {
  const { body: newUser } = req;

  try {
    const usersData = getUsers();
    usersData.push(newUser);
    fs.writeFileSync('data/users.json', JSON.stringify(usersData, null, 2));
    res.send({ message: 'Created new user!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user.' });
  }
};

const usersControllerPut = async (req, res) => {
  const usersData = getUsers();
  const newData = [...usersData];
  const foundIndex = [...newData].findIndex(
    (user) => user.id === req.body.id
  );
  if (!foundIndex === -1) {
    return res.status(404).send({ message: 'User not found!' });
  }

  newData[foundIndex] = req.body;
  fs.writeFileSync('data/users.json', JSON.stringify(newData, null, 2));
  return res.send({ message: 'User updated!' });
};

const usersControllerDelete = async (req, res) => {
  const usersData = getUsers();
  const newData = [...usersData];
  const foundIndex = [...newData].findIndex(
    (user) => user.id === req.body.id
  );

  if (foundIndex === -1) {
    return res.status(404).send({ message: 'User not found!' });
  }

  newData.splice(foundIndex, 1);
  fs.writeFileSync('data/users.json', JSON.stringify(newData, null, 2));
  return res.send({ message: 'User Deleted!' });
};

module.exports = {
  usersController: {
    usersControllerGet,
    usersControllerPost,
    usersControllerPut,
    usersControllerDelete,
  },
};
