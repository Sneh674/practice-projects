import express from "express";
import { createBook, updateBook, listBook, listBookSingle, deleteBook, listBookUser } from "./bookController.js";
import { showAuthors, showTitle, showGenre, getBooksByAuthors } from "./bookController2.js";
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

// bookRouter.get("/",listBook)
bookRouter.get("/",authenticate,listBookUser)
bookRouter.get("/:id",listBookSingle)
bookRouter.delete("/:id",authenticate,deleteBook)

bookRouter.get("/searchbytitle/:title",showTitle)
bookRouter.get("/searchbygenre/:genre",showGenre)
bookRouter.get("/searchbyauthor/:author",showAuthors)
// bookRouter.get("/searchbooksbytitle/:title",showBooksByTitle)
// bookRouter.get("/searchbooksbygenre/:genre",showBooksByGenre)
bookRouter.get("/searchbooksbyauthor/:author",getBooksByAuthors)

// bookRouter.post("/test", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.status(200).send("File uploaded successfully");
// });

export default bookRouter;
