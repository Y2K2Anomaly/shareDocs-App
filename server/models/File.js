import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number
    },
    dropboxPath: {
        type: String
    },
    downloadlink: {
        type: String
    }
})

const File = mongoose.model("files", fileSchema)

export default File;