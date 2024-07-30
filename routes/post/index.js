var express = require('express');
var router = express.Router();
var postController = require('../../controller/post.controller')

//common response for all apis
const successResponse = require('../../utils/successResponse');
const unsuccessResponse = require('../../utils/unsuccessResponse');

router.post('/add',postController.addPost,successResponse,unsuccessResponse)
/* router.post('/get',postController.getPost,successResponse,unsuccessResponse)
router.put('/update/:id',postController.updatePost,successResponse,unsuccessResponse)

router.get('/get/:id',postController.getPostById,successResponse,unsuccessResponse)
router.delete('/delete/:id',postController.deletePostById,successResponse,unsuccessResponse) */

module.exports = router;