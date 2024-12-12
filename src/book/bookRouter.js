import express from "express";
import { createBook, updateBook, listBook } from "./bookController.js";
import multer from "multer";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import authenticate from "../middlewares/authenticate.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const bookRouter = express.Router();

//multer will sore local files from the system to cloudinary
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});


bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "file", maxCount: 1 },//maxCount: 1
    { name: "coverimg", maxCount: 1 } // Include all required fields
  ]),
  createBook
);

bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "file", maxCount: 1 },//maxCount: 1
    { name: "coverimg", maxCount: 1 } // Include all required fields
  ]),
  updateBook
);

bookRouter.get("/",listBook)

// bookRouter.post("/test", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.status(200).send("File uploaded successfully");
// });

export default bookRouter;
