const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    title: {type: String},
    price:{type:String},
    date:{type:String},
    active:{type:String},
    location:{type:String},
    username: {type:String},
    userrating:{type:String},
    details:{type:String},
    description: {type: String},
    category:{type:String}

})


module.exports = mongoose.model("Product", ProductsSchema)
