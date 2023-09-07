import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
    desc: {
        type: String,
        required: true
    },
    downloadlink: {
        type: String
    }
})

const File = mongoose.model("files", fileSchema)

export default File;