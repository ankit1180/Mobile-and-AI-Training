import File from "../Models/Files.Model.js";
import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Configs/Cloudinary.config.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();


let file_size = null;

const fileValidator = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        console.log(file.mimetype + ": allowed");

        fileSizeChecker(cb);
    } else {
        console.log(file.mimetype + ": not allowed");
        cb(new Error("Only images, videos, and PDF files are allowed"));
    }
};


const fileSizeChecker = (cb) => {
    const MAX_FILE_SIZE = parseInt(process.env.FILE_SIZE) * 1024 * 1024;
    console.log('MAX Size of the file : ' + MAX_FILE_SIZE);

    if (!file_size) {
        console.log('error in file size');
        return cb(new Error("File size not found"));
    }


    console.log('CURRENT File Size : ' + file_size.file_size);

    if (file_size.file_size > MAX_FILE_SIZE) {
        console.log('File size is too large : ' + file_size.file_size);
        return cb(new Error("File size is too large"));
    }

    console.log('File size is ok : ' + file_size.file_size);
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '/tmp/my-uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath,)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        fileValidator(req, file, cb);
    }
}).single("file")



export const UploadFile = (req, res) => {

    file_size = req.params;
    upload(req, res, async (err) => {
        try {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const file = req.file;
            console.log(file);

            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "auto"
            });

            fs.unlinkSync(file.path);

            console.log(result);
            const savedFile = await File.create({
                name: result.original_filename,
                url: result.url,
                mimetype: result.resource_type,
                public_id: result.public_id
            });

            res.status(200).json({ message: "File Uploded Successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};


export const getFiles = async (req, res) => {
    try {
        const files = await File.find();

        if (!files.length) {
            return res.status(404).json({ message: "File not found" });
        }

        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { public_id } = req.params;
        if (!public_id) {
            res.status(400).json({ message: "something went wrong" });
        }

        const file = await File.findOneAndDelete({ public_id });

        await cloudinary.uploader.destroy(public_id, { resource_type: file.mimetype });


        res.status(200).json({ message: "File Deleted Successfully" });

    } catch (err) {
        res.status(400).json({ error: err });
    }
};