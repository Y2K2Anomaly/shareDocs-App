import express from 'express';
import { downloadImage, getAllFiles } from '../controllers/doc-controller.js';
import { upload, uploadFile } from '../utils/upload.js';

const router = express.Router();

router.post("/upload", upload.single('file'), uploadFile);
router.get('/files/download/:fileId', downloadImage);
router.get('/files', getAllFiles);

export default router;