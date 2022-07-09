const express = require("express");
const cors = require('cors');
require('dotenv').config()
const session = require('express-session')
const {checkAuth} = require ("./middleware/checkAuth.js");
const {handler} = require   ("./middleware/handler.js");

const  {users} = require('./routes/users.js')
const  {auth} = require('./routes/auth.js')
const  {posts} = require('./routes/posts.js')
const  {comments} = require('./routes/comments.js')
const  {replies} = require('./routes/replies.js')




const app = express()
app.use(express.json())
app.use(cors());
app.use(handler)
app.use(session({
    secret:"secret key",
    resave:false,
    saveUninitialized:false,
    loggedIn:false
}))

const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send("SOCIAL API")
})
app.use('/auth', auth);

app.use('/users', checkAuth, users);
app.use('/posts', checkAuth, posts);
app.use('/comments',checkAuth, comments);
app.use('/replies',checkAuth, replies);






app.get('*',(req,res)=>{
    res.status(404).send({
        status:404,
        success:false,
        message:"RESOURCE NOT FOUND",
        data:[]

    })
    
})


app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
