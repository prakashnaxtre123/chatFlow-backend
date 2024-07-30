
const Model = require('../model/tree.model');
const mongoose = require('mongoose');
const saveData = async (data) => {
  console.log("data",data)
    try {

        // Clear existing data
        //await Model.deleteMany({});

        // Save sample data
        for (const nodeData of data) {
          const node = new Model(nodeData);
          return await  node.save();
        }

    } catch (error) {
        throw error;
    }
}

 const getAllTree = async (data) => {
    try {
        let from = data?.from
        let to = data?.to
        let result = {};
       let treeData = await Model.aggregate([
            {
            $sort: {
                createdOn: -1 
            }
            },
            {
            $skip: from || 0
            },
            {
            $limit: to - from + 1 || 10000
            },
          ])
          let count = await Model.countDocuments() || 0;
          result.data = treeData
          result.count = count
          return result;
    }catch (error) {

    }
 }

 const getTreeById = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);
  try {
      let result = await Model.aggregate([
      {
        $match:  { _id:  objectId }
      },
      
      ])
      return result
  } catch (error) {
      throw error;
  }
}
const deleteData = async (id) => {
  try {
      let tree = await Model.find({_id: id}).exec()
      if(tree?.length){
          let result = await Model.deleteOne({_id: id}).exec()
        return {
            message: "Tree deleted Sucessfully"
        }
      }
      else{
        return {
          message: "Tree  Not Found"
      }
      }
      
  } catch (error) {
      throw error;
  }
}
const editData = async (data,id) => {
  try {
      let result = await Model.updateOne({_id: id},{$set:data}).exec()
      return {
          message: "Tree updated Sucessfully"
      }
  } catch (error) {
      throw error;
  }
}


module.exports = {
    saveData,getAllTree,getTreeById,deleteData,editData
}