import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
})

export default mongoose.model("products", productsSchema)