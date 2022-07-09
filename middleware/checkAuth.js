module.exports={
     checkAuth:(req,res,next)=>{
        let session = {
            loggedIn:false
        }
        if(session.loggedIn){
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