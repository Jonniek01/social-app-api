const express = require("express");
const { getPosts, getPost,patchPost, deletePost,getPostByCreator, create, } = require("../controllers/posts.js") ;
const posts = express.Router();

posts.get('/', getPosts)
posts.get('/:id', getPost)
posts.patch('/:id', patchPost)
posts.delete('/:id', deletePost)
posts.post('/', getPostByCreator)
posts.post('/create',create)




module.exports = {posts}