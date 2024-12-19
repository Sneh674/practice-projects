import createHttpError from "http-errors";
import userModel from "../user/userModel.js";
import bookModel from "./bookModel.js";

const showTitle = async (req, res, next) => {
    const { title } = req.params;

    // If no name is provided, proceed to the next middleware
    if (!title) return next();

    try {
        // Use regex for case-insensitive and partial matching
        const titles = await bookModel.find({
            title: { $regex: title, $options: 'i' } // 'i' makes it case-insensitive
        }).select('title');
        if (!titles || titles.length === 0) {
            return next(createHttpError(404, "No such book name"));
        }

        // Respond with the authors or an empty array if none are found
        res.json(titles);
    } catch (error) {
        console.error(error);
        return next(createHttpError(500,"Error while searching for title"));
    }
};

// const showGenre = async (req, res, next) => {
//     const { genre } = req.params;

//     // If no name is provided, proceed to the next middleware
//     if (!genre) return next();

//     try {
//         // Use regex for case-insensitive and partial matching
//         const genres = await bookModel.find({
//             title: { $regex: genre, $options: 'i' } // 'i' makes it case-insensitive
//         });
//         if (!genres || genres.length === 0) {
//             return next(createHttpError(404, "No such genre"));
//         }

//         // Respond with the authors or an empty array if none are found
//         res.json(genres);
//     } catch (error) {
//         console.error(error);
//         return next(createHttpError(500,"Error while searching for genre"));
//     }
// };
const showGenre = async (req, res, next) => {
    const { genre } = req.params;

    // If no genre is provided, proceed to the next middleware
    if (!genre) return next(createHttpError(400, "Genre parameter is required"));

    try {
        // Trim the input to remove leading/trailing spaces
        const sanitizedGenre = genre.trim();

        // Construct the regex for case-insensitive, partial match
        const regex = new RegExp(sanitizedGenre, 'i');  // 'i' for case-insensitive

        // Query the database for books with matching genre
        const genres = await bookModel.find({
            genre: { $regex: regex },
        }).select('genre');

        // If no matching genres were found, return an error
        if (!genres || genres.length === 0) {
            return next(createHttpError(404, "No books found for the specified genre"));
        }

        // Return the found genres
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error while searching for genre:", error);
        return next(createHttpError(500, "An internal server error occurred while searching for genre"));
    }
};

const showAuthors = async (req, res, next) => {
    const { author } = req.params;

    if (!author) return next(createHttpError(400, "Author parameter is required"));

    try {
        const sanitizedAuthor = author.trim();
        const regex = new RegExp(sanitizedAuthor, 'i');

        const user = await userModel.findOne({
            name: { $regex: regex }
        });

        if (!user) {
            return next(createHttpError(404, "No user found matching the author name"));
        }

        const books = await bookModel.find({ author: user._id }).select('author');

        if (!books || books.length === 0) {
            return next(createHttpError(404, "No books found for the specified author"));
        }

        res.status(200).json(books);
    } catch (error) {
        console.error("Error while searching for user:", error);
        return next(createHttpError(500, "An internal server error occurred while searching for user"));
    }
};


export {showAuthors, showGenre, showTitle}