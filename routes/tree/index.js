var express = require('express');
var router = express.Router();
var treeController = require('../../controller/tree.controller')

//common response for all apis
const successResponse = require('../../utils/successResponse');
const unsuccessResponse = require('../../utils/unsuccessResponse');

router.post('/add',treeController.addTree,successResponse,unsuccessResponse)
 router.post('/get',treeController.getTree,successResponse,unsuccessResponse)
/*router.put('/update/:id',postController.updatePost,successResponse,unsuccessResponse)

router.get('/get/:id',postController.getPostById,successResponse,unsuccessResponse)*/
router.delete('/delete/:id',treeController.deleteTreeById,successResponse,unsuccessResponse) 

module.exports = router;