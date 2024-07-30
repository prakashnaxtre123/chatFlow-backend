
const dal = require('../dal');
const { WrongInputError } = require('../utils/handler/error');
const insertToCollection = async (collection, data) => {
    try {
        console.log("data=======",data)
        const _result = await dal[collection].saveData(data);
        const result = JSON.parse(JSON.stringify(_result));
        delete result.__v;
        delete result?.password;
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const updateToCollection = async (collection, data,id) => {
    try {
        const _result = await dal[collection].editData(data,id);
        const result = JSON.parse(JSON.stringify(_result));
        delete result.__v;
        delete result.password;
        return result;
    } catch (error) {
        throw error;
    }
}
const updateAllToCollection = async (collection, data) => {
    try {
        const _result = await dal[collection].editAllData(data);
        const result = JSON.parse(JSON.stringify(_result));
        delete result.__v;
        delete result.password;
        return result;
    } catch (error) {
        throw error;
    }
}
const deleteToCollection = async (collection, id) => {
    try {
        const _result = await dal[collection].deleteData(id);
        const result = JSON.parse(JSON.stringify(_result));
        delete result.__v;
        delete result.password;
        return result;
    } catch (error) {
        throw error;
    }
}

const getFromCollection = async (collection, condition, recordType, projection, method) => {
    try {
        method = method || "getData"
        recordType = recordType || "multiple";
        projection = projection || [];
        const _result = await dal[collection][method](condition, projection);
        let result;
        if (recordType == "single") {
            if (_result.length && _result.length > 0) {
                result = JSON.parse(JSON.stringify(_result[0]));
            } else {
                throw new WrongInputError("No record found with given inputs", "", condition)
            }
        } else {
            result = JSON.parse(JSON.stringify(_result));
        }

        delete result?.__v;
        delete result?.isDeleted;
        delete result?.isPublished;
        return result;
    } catch (error) {
        throw error
    }
}
module.exports = {
    insertToCollection,getFromCollection,updateToCollection,deleteToCollection,updateAllToCollection
    
}