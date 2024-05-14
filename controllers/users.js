import bcrypt from "bcrypt";
import generateId from "../utils/generateId";

let users = [
  {
    id: 1,
    name: "Paul Desjardins",
    username: "pauldesjardins",
  },
  {
    id: 2,
    name: "John Desjardins",
    username: "johndesjardins",
  },
];

// create user
const createUser = async (req, res) => {
  const { name, username, password: plainPassword } = req.body;
  const hashPassword = await bcrypt.hash(
    plainPassword,
    parseInt(process.env.SALT_ROUNDS, 10)
  );
  const newUser = {
    id: generateId(users),
    name,
    username,
    password: hashPassword,
  };
  users.push(newUser);
  res.json(newUser);
};

// get all users
const getUsers = (req, res) => {
  res.json(users);
};

// get a single user by id
const getUser = (req, res) => {
  const { id } = req.params;
  const userResult = users.find((user) => user.id === parseInt(id, 10));
  if (userResult) {
    res.json(userResult);
  } else {
    res.status(204).end();
  }
};

// update a single user by id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = users.findIndex((user) => user.id === parseInt(id, 10));
  if (index !== -1) {
    let hashPassword = null;
    if (body.password) {
      hashPassword = await bcrypt.hash(
        body.password,
        parseInt(process.env.SALT_ROUNDS, 10)
      );
    }
    users[index] = {
      ...users[index],
      ...body,
      password: hashPassword || users[index].password,
    };
    res.json(users[index]);
  }
  res.status(204).end();
};

// delete a user by id
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  users = users.filter((user) => user.id !== userId);
  res.status(204).end();
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
