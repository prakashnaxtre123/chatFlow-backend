
const Model = require('../model/post.model');
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

 const getAllPost = async (data) => {
    try {
        let from = data?.from
        let to = data?.to
        let result = {};
       let postData = await Model.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "postedBy",
                foreignField: "_id",
                as: "postedByUser"
              }
            },
            {
              $unwind: "$postedByUser"
            },
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
            {
              $project: {
                heading: 1,
                banner: 1,
                content: 1,
                createdOn: 1,
                postedBy: "$postedByUser.username", // Replace with any user field you want
              }
            }
          ])
          let count = await Model.countDocuments() || 0;
          result.data = postData
          result.count = count
          return result;
    }catch (error) {

    }
 }

 const getPostById = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);
  try {
      let result = await Model.aggregate([
      {
        $match:  { _id:  objectId }
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedByUser"
        }
      },
      {
        $unwind: "$postedByUser"
      },
      {
        $project: {
          _id:1,
          heading:1,
          banner:1,
          content:1,
          createdOn: 1,
          postedBy: 1,
          postedByUser: "$postedByUser.username"

        }
      }
      ])
      return result
  } catch (error) {
      throw error;
  }
}
const deleteData = async (id) => {
  try {
      let post = await Model.find({_id: id}).exec()
      if(post?.length){
          let result = await Model.deleteOne({_id: id}).exec()
        return {
            message: "Post deleted Sucessfully"
        }
      }
      else{
        return {
          message: "Post  Not Found"
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
          message: "Post updated Sucessfully"
      }
  } catch (error) {
      throw error;
  }
}


module.exports = {
    saveData,getAllPost,getPostById,deleteData,editData
}