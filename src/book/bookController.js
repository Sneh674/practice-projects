import createHttpError from "http-errors";
// import { config } from "../config/config.js";
import path from "node:path";
import fs from 'fs';
import cloudinary from "../config/cloudinary.js"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bookModel from "./bookModel.js";

export { __dirname };

const createBook = async (req, res, next) => {
    console.log(__dirname)
  try {
    console.log(req.body.title)
    console.log(req.files)

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { title, genre } = req.body;
    const { file, coverimg } = req.files;

    if(!title||!genre){
      return res.status(400).json({ message: "Missing details "});
    }
    if (!file || !coverimg) {
      return res.status(400).json({ message: "Missing required files" });
    }

    const coverimgMimeType = coverimg[0].mimetype.split("/").at(-1);
    const fileName = coverimg[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverimgMimeType,
    });
    console.log("trial")

    const bookFileName = file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    console.log("Book File Upload Result:", bookFileUploadResult);
    console.log("Cover Image Upload Result:", uploadResult);

    const newBook=await bookModel.create({
      title,
      genre,
      author:"adsdxwswwxsx9953jjibij0944",
      coverimg: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    })

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file at ${filePath}:`, error);
    }

    try {
      await fs.promises.unlink(bookFilePath);
    } catch (error) {
      console.error(`Error deleting file at ${bookFilePath}:`, error);
    }
  

    res
      .status(200)
      .json({
        message: "Files uploaded successfully",
        id: newBook._id,
        uploadResult,
        bookFileUploadResult,
      });
  } catch (error) {
    console.error("Error uploading files:", error);
    next(createHttpError(500, "An error occurred while uploading files."));
  }
};

export { createBook };
