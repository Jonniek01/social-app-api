const poolPromise = require('../config/poolPromise')

module.exports = {

    logIn: async (req, res)=>{
        const {email, password} = req.body
        let pool = await poolPromise()
        pool.query(`select * FROM users WHERE email='${email}'`).then(results=>{
            let user=results.recordset[0]
            if(user){
                let pass=user.password
                if(password===pass){
                        return res.status(200).json({
                            status:200,
                            success: true,
                            message: "Logged in successfully",
                            results:user})

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


        
    },

    create: async(req, res)=>{
            
        let {id,name,email,password} = req.body;
            let pool = await poolPromise()
       
            pool.query(`insert into users (id, name, email, password)
                        VALUES('${id}', '${name}', '${email}', '${password}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                return res.status(200).json({
                                    status:200,
                                    success: true,
                                    message: "USER ADDED SUCCESFULLY"
                                   })
                            }})
                            .catch(err=>{
                                return res.status(400).json({
                                    status:400,
                                    success:false,
                                    message: err
                                   })

                            })
                        } 

}