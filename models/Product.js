const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    title: {type: mongoose.Schema.Types.ObjectId},
    price:{type:String},
    username: {type:String},
    userrating:{type:String},
    details:{type:String},
    description: {type: String},
    category:{type:String}

})


module.exports = mongoose.model("Products", ProductsSchema)
