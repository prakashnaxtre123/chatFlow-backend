
const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log(`MongoDB connected Successfully`)
}).catch((error) => {
    throw error
})