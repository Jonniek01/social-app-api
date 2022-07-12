module.exports={
     checkAuth:(req,res,next)=>{
        // console.log(req.session)
   
        if(req.session.loggedIn){
            next()
            return
        }
        res.status(401).json(
            {
                "status":401,
                "message":"You are not logged in"
            }
        )
    
    }
    


}