const poolPromise = require('../config/poolPromise')


module.exports = {
    getReplies: async(req, res)=>{


        let pool = await poolPromise()
        pool.query(`select * FROM replies`).then(results=>{
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


getReply: async(req, res)=>{

    const {id} = req.params
    let pool = await poolPromise()
    pool.query(`select * FROM replies WHERE id='${id}'`).then(results=>{
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


patchReply: async(req, res)=>{
    //COMMENT ID
    const {id} = req.params
    const {content}=req.body
    let pool = await poolPromise();
    pool.query(`EXEC patchreply '${id}','${content}'`)
                .then(results=>{
                    console.log(results)
                    res.send("UPDATE SUCCESFUL")
                })
                .catch(err=>{
                    console.log(err)
                    res.send("UPDATE FAILED")
                })


},

deleteReply: async(req, res)=>{
    const {id} = req.params;
    let pool = await poolPromise();
        //  CREATE A PROCEDURE FOR DELETING REPLIES
    pool.query(`EXEC deletereply '${id}'`)
    .then(results=>{
        console.log(results)
        res.send("DELETE SUCCESFUL")
    })
    .catch(err=>{
        console.log(err)
        res.send("FAILED TO DELETE")
    })





},


getRepliesByComment: async(req, res)=>{
    //COMMENT ID FROM BODY
    const {id} = req.body

    
    let pool = await poolPromise()
    pool.query(`select * FROM replies WHERE comment_id='${id}'`).then(results=>{
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
                message: "NO REPLIES ON THIS COMMENT OR COMMENT DOES NOT EXIST",
                results:{}})
                }

                )
            
},
create: async(req, res)=>{

    const {id} = req.params; //COMMENT ID
        //GENERATE UNIQUE REPLY IDS IN THE DB
            
    let {creator_id, content} = req.body;
        let pool = await poolPromise()
   
        pool.query(`insert into replies (comment_id,creator_id, content)
                    VALUES('${comment_id}','${creator_id}', '${content}')`)
                    .then(results=>{
                        if(results.rowsAffected){
                            return res.status(200).json({
                                status:200,
                                success: true,
                                message: "REPLY ADDED SUCCESFULLY"
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