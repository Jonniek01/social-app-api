const express = require("express");
const { getComments, getComment,patchComment, deleteComment,getCommentsByPost, create, } = require("../controllers/comments.js") ;
const comments = express.Router();

comments.get('/',getComments)
comments.get('/:id', getComment)
comments.patch('/:id', patchComment)
comments.delete('/:id', deleteComment)
comments.post('/', getCommentsByPost)
comments.post('/create/:id', create)




module.exports = {comments}