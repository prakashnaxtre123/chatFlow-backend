const mongoose = require('mongoose');
const { Schema, model, Types: { ObjectId } } = mongoose;

// Define the schema for a node
const nodeSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String},
    question: { type: String},
    children: [this] // Recursively reference the same schema
  });
  
  // Create a model for the node
  const _model = model('Posts', nodeSchema);
  module.exports = _model;