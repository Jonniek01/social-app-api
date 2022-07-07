const express = require("express");
const { getReplies, getReply,patchReply, deleteReply,getRepliesByComment, create, } = require("../controllers/replies.js") ;
const replies = express.Router();

replies.get('/',getReplies)
replies.get('/:id', getReply)
replies.patch('/:id', patchReply)
replies.delete('/:id', deleteReply)
replies.post('/', getRepliesByComment)
replies.post('/create', create)




module.exports = {replies}