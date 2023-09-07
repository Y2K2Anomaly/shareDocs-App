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

export const downloadImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId)

        file.downloadCount++;
        await file.save();

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