import mongoose from "mongoose";

const bookSchema =new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{type: mongoose.Schema.Types.ObjectId, required: true},
    genre:{type: String, required: true},
    coverimg: {type: String, required: true},
    file:{type: String, required: true}
},{timestamps: true})

export default mongoose.model("Book", bookSchema)