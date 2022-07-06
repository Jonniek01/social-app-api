const poolPromise = require('../config/poolPromise')


module.exports = {
    
    getUsers: async(req, res)=>{


            let pool = await poolPromise()
            pool.query(`select * FROM users`).then(results=>{
                res.status(200).json({
                    status:200,
                    success: true,
                    message: "success",
                    results:results.recordset})
            }

            )
        

        
    },
    getUser: async(req, res)=>{

        const {id} = req.params
        let pool = await poolPromise()
        pool.query(`select * FROM users WHERE id='${id}'`).then(results=>{
            let user=results.recordset[0]
            if(user){
                return res.status(200).json({
                    status:200,
                    success: true,
                    message: "success",
                    results:user})}

                res.status(404).json({
                    status:404,
                    success: false,
                    message: "not found",
                    results:{}})
                    }

                    )
                
    },
    patchUser: async(req, res)=>{
        const {id} = req.params
        const {name, email}=req.body
        console.log(email,name)
        let pool = await poolPromise();
        pool.query(`EXEC patchuser '${email}','${name}','${id}'`)
                    .then(results=>{
                        console.log(results)
                        res.send("UPDATE SUCCESFUL")
                    })
                    .catch(err=>{
                        console.log(err)
                        res.send("UPDATE FAILED")
                    })


    },
    deleteUser: async(req, res)=>{
        const {id} = req.params;
        let pool = await poolPromise();

        pool.query(`DELETE users WHERE' id='${id}'`)
        .then(results=>{
            console.log(results)
            res.send("DELETE SUCCESFUL")
        })
        .catch(err=>{
            console.log(err)
            res.send("FAILED TO DELETE")
        })





    }
}