import express from 'express';
import { deleteFile, getAllFiles, uploadDoc } from '../controllers/doc-controller.js';
import { downloadImage } from '../controllers/doc-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post("/upload", upload.single('file'), uploadDoc);
router.get('/files/download/:fileId', downloadImage);
router.get('/files', getAllFiles);
router.post('/files/delete/:fileId', deleteFile);

export default router;