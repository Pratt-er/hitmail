const express = require("express");
const controller = require("../controller/controller")



const commentRouter = express.Router();




commentRouter.post("/",  controller.postComment)
// commentRouter.post('/:commentId/replies', controller.postReply);

commentRouter.get('/', controller.getComment)
commentRouter.put('/:commentId', controller.updateComment)
commentRouter.delete('/:commentId', controller.deleteComment)




module.exports = commentRouter


