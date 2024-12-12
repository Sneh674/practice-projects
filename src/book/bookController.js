import createHttpError from "http-errors";
// import { config } from "../config/config.js";
import path from "node:path";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "../config/cloudinary.js"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { __dirname };

const createBook = async (req, res, next) => {
    console.log(__dirname)
  try {
    console.log(req.body.title)
    console.log(req.files)

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { file, coverimg } = req.files;

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

    console.log("trial")
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverimgMimeType,
    });
    console.log("trial2")

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

    res
      .status(200)
      .json({
        message: "Files uploaded successfully",
        uploadResult,
        bookFileUploadResult,
      });
  } catch (error) {
    console.error("Error uploading files:", error);
    next(createHttpError(500, "An error occurred while uploading files."));
  }
};

export { createBook };
