const poolPromise = require('../config/poolPromise')
const {commentValidator} = require('../middleware/validator')

const { v4: uuidv4 } = require('uuid')



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
    const {postid} = req.params;
    console.log('re',req.body)
        let pool = await poolPromise()
        /*
        1.Validate schema
        2.check if user has other comment on same post {post_id, creator_id}
        3. If no previous comment, create comment

        */
       const data=req.body
       console.log("aa",data)
       data.id=uuidv4()

       console.log("bb",data)

        await commentValidator.validateAsync(data).then(result=>{
          
            const {id,creator_id,content } = result;
            pool.query(`SELECT * FROM comments WHERE post_id='${postid}' AND creator_id='${creator_id};'`)
            .then(response=>{
                if(response.recordset==[]){
                    //proceed to adding comment
                    pool.query(`INSERT INTO COMMENTS (id, post_id, creator_id, content)
                    VALUES('${id}', '${postid}', '${creator_id}', '${content}')`)
                    .then(results=>{
                        if(results.rowsAffected){
                            return res.status(200).json({
                                status:200,
                                success: true,
                                message: "COMMENT ADDED SUCCESFULLY"
                               })
                        }})
                        .catch(err=>{
                            return res.status(400).json({
                                status:400,
                                success:false,
                                message: err.message
                               })

                        })



                }
                else{
                    res.json({
                        message:"You can not comment on a post twice"
                    })
                }
                
            })
            .catch(err=>{
                //couldnt query db
                res.json({
                    message:"Unsuccesful",
                    error:err

                })
            })


        })
        .catch(err=>{
            res.status(422).json(
                {
                    status:422,
                    error:"schema validation failed",
                    message:err.message

                }
             
            )
        })

   
                        
 } 






}