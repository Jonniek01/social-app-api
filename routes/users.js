const express = require("express");
const { getUsers, getUser, patchUser, deleteUser } = require("../controllers/users.js") ;

const users = express.Router();

users.get('/', getUsers)
users.get('/:id', getUser)
users.patch('/:id', patchUser)
users.delete('/:id', deleteUser)


module.exports = {users}