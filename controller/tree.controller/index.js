const { Types: { ObjectId } } = require('mongoose')
const crudService = require('../../services/crud.service');

const addTree = async (req, res, next) => {
    try {
        const body = req.body
        body.postedOn = new Date();
        const result = await crudService.insertToCollection('tree', body);
        res.locals.message = "Tree Generated Sucessfully"
        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const getTree  = async (req, res, next) => {
    try {
        const body = req.body
        body.postedOn = new Date();
        const result = await crudService.getFromCollection('tree', body, 'multiple',[],'getAllTree');

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}

const getTreeById = async (req,res,next) => {
    try {
        let id = req.params.id
        const result = await crudService.getFromCollection('tree', id, 'single',[],'getTreeById');

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const updateTree = async (req,res,next) => {
    try {
        let id = req.params.id
        let body = req.body
        const result = await crudService.updateToCollection('tree', body, id);

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}
const deleteTreeById = async (req,res,next) => {
    try {
        let id = req.params.id
        const result = await crudService.deleteToCollection('tree', id);

        res.locals.finalResponse = result;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addTree,getTree,getTreeById,updateTree,deleteTreeById

}