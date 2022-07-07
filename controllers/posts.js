const poolPromise = require('../config/poolPromise')


module.exports = {
    getPosts: async(req, res)=>{


        let pool = await poolPromise()
        pool.query(`select * FROM posts`).then(results=>{
            res.status(200).json({
                status:200,
                success: true,
                message: "success",
                results:results.recordset})
        }

        )
        .catch(err=>{
            res.send(err)
        })
    

    
},


getPost: async(req, res)=>{

    const {id} = req.params
    let pool = await poolPromise()
    pool.query(`select * FROM posts WHERE id='${id}'`).then(results=>{
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


patchPost: async(req, res)=>{
    const {id} = req.params
    const {content}=req.body
    let pool = await poolPromise();
    pool.query(`EXEC patchpost '${id}','${content}'`)
                .then(results=>{
                    console.log(results)
                    res.send("UPDATE SUCCESFUL")
                })
                .catch(err=>{
                    console.log(err)
                    res.send("UPDATE FAILED")
                })


},

deletePost: async(req, res)=>{
    const {id} = req.params;
    let pool = await poolPromise();
        //  CREATE A PROCEDURE FOR DELETING POSTS
    pool.query(`EXEC deletepost '${id}'`)
    .then(results=>{
        console.log(results)
        res.send("DELETE SUCCESFUL")
    })
    .catch(err=>{
        console.log(err)
        res.send("FAILED TO DELETE")
    })





},


getPostByCreator: async(req, res)=>{

    const {id} = req.body

    
    let pool = await poolPromise()
    pool.query(`select * FROM posts WHERE creator_id='${id}'`).then(results=>{
        let post=results.recordset
        if(post.length>0){
            return res.status(200).json({
                status:200,
                success: true,
                message: "success",
                results:post})}

            res.status(404).json({
                status:404,
                success: false,
                message: "NO POSTS FROM THIS USER OR USER DOES NOT EXIST",
                results:{}})
                }

                )
            
},
create: async(req, res)=>{
    const {id} = req.params;
        //GENERATE UNIQUE POST IDS IN THE DB
            
    let {content} = req.body;
        let pool = await poolPromise()
   
        pool.query(`insert into posts (creator_id, content)
                    VALUES('${id}', '${id}')`)
                    .then(results=>{
                        if(results.rowsAffected){
                            return res.status(200).json({
                                status:200,
                                success: true,
                                message: "POST ADDED SUCCESFULLY"
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