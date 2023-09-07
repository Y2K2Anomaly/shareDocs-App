import express from 'express';
import { getAllFiles, uploadDoc } from '../controllers/doc-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post("/upload", upload.single('file'), uploadDoc);
router.get('/files', getAllFiles);

export default router;