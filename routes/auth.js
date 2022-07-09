const express = require("express");
const { logIn,create, logOut} = require("../controllers/auth.js") ;

const auth = express.Router();

auth.post('/login', logIn)
auth.post('/create', create)
auth.get('/logout',logOut)


module.exports = {auth}