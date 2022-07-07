const express = require("express");
const { logIn,create} = require("../controllers/auth.js") ;

const auth = express.Router();

auth.post('/login', logIn)
auth.post('/create', create)


module.exports = {auth}