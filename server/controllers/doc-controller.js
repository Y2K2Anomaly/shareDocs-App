import { response } from "express"
import File from "../models/File.js"

export const uploadDoc = async (req, res) => {

    const fileObj = {
        path: req.file.path,
        name: req.file.originalname,
        desc: req.body.desc
    }

    try {
        const newFile = await File.create(fileObj)

        const downloadlink = `https://sharedocs-api.onrender.com/files/download/${newFile._id}`;

        newFile.downloadlink = downloadlink;
        await newFile.save();

        res.status(201).json(newFile)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: error.message })
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

export const deleteFile = async (req, res) => {
    try {
        await File.findByIdAndDelete(req.params.fileId);
        res.status(200).json("Deleted Successfully")
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message })
    }
} 