import multer from 'multer';
import { Dropbox } from 'dropbox';
import fs from 'fs';
import File from '../models/File.js';

const upload = multer({ dest: 'uploads' });

const dropbox = new Dropbox({ accessToken: 'sl.BlvEn4mTcznNWtVCBiOuEcSfyv8XxE6-YFbpeKuDiLFLMPfrcGXU5KBDkYWCSpUHyeBBT9wiAZxz9HOTsbihM1wZxwO-hI1ducomE3524_0MkeD26cwYmGzEO7tmk8CnsaKtcZGxwFoyBD4' });

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileContent = fs.readFileSync(req.file.path);

    try {
        const dropboxResponse = await dropbox.filesUpload({
            path: `/${req.file.originalname}`,
            contents: fileContent,
        });

        const dropboxPath = dropboxResponse.result.path_display;

        const sharedLinkResponse = await dropbox.sharingCreateSharedLink({
            path: dropboxPath,
        });
        const dropboxShareLink = sharedLinkResponse.result.url;

        const dropBoxDownloadLink = sharedLinkResponse.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

        const newFile = await File.create({
            name: req.file.originalname,
            desc: req.body.desc,
            fileSize: req.file.size,
            dropboxPath: dropboxShareLink,
            downloadlink: dropBoxDownloadLink
        });

        res.status(201).json(newFile);
    } catch (error) {
        console.error('Error uploading to Dropbox:', error);
        res.status(500).json({ message: 'Failed to upload file to Dropbox.' });
    }
};

export { upload, uploadFile };