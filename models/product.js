const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    manufacturer: String,
    price: Number,
    discount: Number,
    quantity: Number
})

module.exports = mongoose.model("Product", ProductSchema)
