const poolPromise = require('../config/poolPromise')


module.exports = {
    getComments: async(req, res)=>{


        let pool = await poolPromise()
        pool.query(`select * FROM comments`).then(results=>{
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


getComment: async(req, res)=>{

    const {id} = req.params
    let pool = await poolPromise()
    pool.query(`select * FROM comments WHERE id='${id}'`).then(results=>{
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


patchComment: async(req, res)=>{
    //COMMENT ID
    const {id} = req.params
    const {content}=req.body
    let pool = await poolPromise();
    pool.query(`EXEC patchcomment '${id}','${content}'`)
                .then(results=>{
                    console.log(results)
                    res.send("UPDATE SUCCESFUL")
                })
                .catch(err=>{
                    console.log(err)
                    res.send("UPDATE FAILED")
                })


},

deleteComment: async(req, res)=>{
    const {id} = req.params;
    let pool = await poolPromise();
        //  CREATE A PROCEDURE FOR DELETING COMMENTS
    pool.query(`EXEC deletecomment '${id}'`)
    .then(results=>{
        console.log(results)
        res.send("DELETE SUCCESFUL")
    })
    .catch(err=>{
        console.log(err)
        res.send("FAILED TO DELETE")
    })





},


getCommentsByPost: async(req, res)=>{
    //POST ID FROM BODY
    const {id} = req.body

    
    let pool = await poolPromise()
    pool.query(`select * FROM comments WHERE post_id='${id}'`).then(results=>{
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
                message: "NO COMMENTS FOR THIS POST OR POST DOES NOT EXIST",
                results:{}})
                }

                )
            
},
create: async(req, res)=>{
    const {id} = req.params;
        //GENERATE UNIQUE COMMENT IDS IN THE DB
            
    let {content} = req.body;
        let pool = await poolPromise()
   
        pool.query(`insert into comments (creator_id, content)
                    VALUES('${id}', '${content}')`)
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