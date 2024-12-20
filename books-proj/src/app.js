import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./user/userRouter.js";
import bookRouter from "./book/bookRouter.js";
import cors from "cors";

const app = express();

// app.use(cors({
//     origin: "http://localhost:5173"
// }))

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
//   })
// );

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Local development URL
  "https://book-frontend-nlvi.onrender.com", // Deployed frontend URL
];

// CORS setup for handling different origins
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from specified origins or requests with no origin (e.g., Postman)
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
    credentials: true, // If you need to handle cookies or credentials
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome to the apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(globalErrorHandler);

export default app;
