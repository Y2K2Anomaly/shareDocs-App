import { response } from "express"
import File from "../models/File.js"

export const downloadImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);

        res.download(file.path, file.name);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message })
    }
}

export const getAllFiles = async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).json(files)
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message })
    }
}