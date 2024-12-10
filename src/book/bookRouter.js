import express from 'express'
import { createBook } from './bookController.js'
import multer from "multer"
import path from 'node:path'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bookModel from './bookModel.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const bookRouter=express.Router()

//multer will sore local files from the system to cloudinary
const upload=multer({
    dest: path.resolve(__dirname,'../../public/data/uploads'),
    limits: {fileSize: 3e7}
})

bookRouter.post(
    "/", 
    upload.fields([
        {name: 'coverimg', maxCount: 1},
        {name: 'file', maxCount: 1}
    ]) ,
    createBook
)

export default bookRouter;