const express = require("express");
const { getComments, getComment,patchComment, deleteComment,getCommentsByCreator, create, } = require("../controllers/comments.js") ;
const comments = express.Router();

comments.get('/',getComments)
comments.get('/:id', getComment)
comments.patch('/:id', patchComment)
comments.delete('/:id', deleteComment)
comments.post('/', getCommentsByCreator)
comments.post('/create', create)




module.exports = {comments}