const { Types: { ObjectId } } = require('mongoose')
const crudService = require('../../services/crud.service');

const addPost = async (req, res, next) => {
    try {
        const body = req.body
        body.postedOn = new Date();
        const result = await crudService.insertToCollection('post', body);

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const getPost  = async (req, res, next) => {
    try {
        const body = req.body
        body.postedOn = new Date();
        const result = await crudService.getFromCollection('post', body, 'multiple',[],'getAllPost');

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}

const getPostById = async (req,res,next) => {
    try {
        let id = req.params.id
        const result = await crudService.getFromCollection('post', id, 'single',[],'getPostById');

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const updatePost = async (req,res,next) => {
    try {
        let id = req.params.id
        let body = req.body
        const result = await crudService.updateToCollection('post', body, id);

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const deletePostById = async (req,res,next) => {
    try {
        let id = req.params.id
        const result = await crudService.deleteToCollection('post', id);

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addPost,getPost,getPostById,updatePost,deletePostById

}