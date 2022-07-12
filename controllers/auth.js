const poolPromise = require('../config/poolPromise')
const {loginValidator, signupValidator} = require('../middleware/validator')
const { v4: uuidv4 } = require('uuid')


module.exports = {

    logIn: async (req, res)=>{
        let pool = await poolPromise();
        await loginValidator.validateAsync(req.body).then(result=>{
            const {email, password}=result;
            pool.query(`select * FROM users WHERE email='${email}'`).then(results=>{

                let user=results.recordset[0]
                if(user){
                    let pass=user.password
                    if(password===pass){
                        req.session.loggedIn=true
                        req.session.user=user
    
                        
    
                            return res.status(200).json({
                                status:200,
                                success: true,
                                message: "Logged in successfully",
                                results:req.session.user=user
                            })
    
                    }
                    else{
                        return  res.status(401).json({
                                status:401,
                                success: false,
                                message: "Wrong password",
                                results:{}})
    
    
    
                    }
    
                    
                    
                    
                    }
    
                    res.status(404).json({
                        status:404,
                        success: false,
                        message: "Invalid email",
                        results:{}})
    
    
            })
    
        })
        .catch(err=> res.status(422).json(
            {
                status:422,
                success:false,
                message:err.message
            }
        )
            );
        


        
    },


    /*SIGN UP MIDDLEWARE*/

    create: async(req, res)=>{
        let pool = await poolPromise()
        await signupValidator.validateAsync(req.body).then(result=>{
            result.id=uuidv4()
            let {id,name,email,password} = result;
            //Check if user exists
            pool.query(`SELECT email FROM users WHERE email='${email}'`).then(
            result =>{
                //if does not exist, insert
                if(result.rowsAffected==0){
                    pool.query(`insert into users (id, name, email, password)
                    VALUES('${id}', '${name}', '${email}', '${password}')`)
                    .then(results=>{
                        //if insertion succesful
                        if(results.rowsAffected){
                            return res.status(200).json({
                                status:200,
                                success: true,
                                message: "USER ADDED SUCCESFULLY"
                            })
                        }})
                        //else
                        .catch(err=>{
                            return res.status(400).json({
                                status:400,
                                success:false,
                                message: err
                            })

                        })
        }
        //else if email already exists
                else{
                    res.send(
                        {
                            status:400,
                            message:"email already exists"
                        }
                    )
                }
                }
            )
        })
//if schema validation failed
        .catch(err=> res.status(422).json(
            {
                status:422,
                success:false,
                message:err.message
            }
        )
     );
                                    
     } ,
     logOut: (req, res,)=>{
        req.session.loggedIn=false
        res.send(
            {
                loggedIn:req.session.loggedIn,
                success:true,
                message:"You are now logged out"
            }
        )
    }

}
