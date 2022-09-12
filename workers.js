import mongoose from "mongoose";

const workerSchema = mongoose.Schema({
    name: String,
    country: String,
    age: Number,
    phone: String,
    job: String,
    years: String,
})

export default mongoose.model("workers", workerSchema)