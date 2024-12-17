import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Allbooksuser = () => {
    const navigate = useNavigate();
    const [userrBooks, setUserrBooks] = useState([]);
    const [otherrBooks, setOtherrBooks] = useState([]);

    const fetchAPI = async () => {
        try {
            const token=localStorage.getItem('authToken');
            if(!token){navigate("/")}
            console.log("trial")
            const response = await axios.get(
                "http://localhost:4000/api/books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }
            );
            console.log(response.data.userBooks)
            setUserrBooks(response.data.userBooks)
            console.log(response.data.otherBooks);
            setOtherrBooks(response.data.otherBooks)
            // setBooks(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        console.log("trial")
        fetchAPI();
    }, []);

    return (
        <div className="m-0 p-7 bg-slate-700 min-h-screen">
            <Link
                to="/createbook"
                className="text-cyan-500 text-lg bg-slate-800 p-2 m-2 rounded-md"
            >
                Add Book
            </Link>
            <div className="userbooks mt-5">
                <div className="text-cyan-300 text-2xl mb-2">Your books</div>
                <div className="flex text-cyan-200 text-lg">
                    {userrBooks.length > 0 ? (
                        userrBooks.map((book) => (
                            <div key={book._id} style={{ width: "300px" }}>
                                <h3 className="truncate text-xl font-semibold">Title : {book.title}</h3>
                                <p className="truncate text-md">Genre : {book.genre}</p>
                                <p className="truncate text-md">Author : {book.author}</p>
                                <img
                                    src={book.coverimg}
                                    alt={`${book.title} cover`}
                                    className="w-32 h-48 object-cover rounded-lg mt-2 mb-2 border border-cyan-500"
                                />
                                <div className="links flex flex-col space-y-2">
                                    <Link to={`/editbook/${book._id}`} className="underline">Edit</Link>
                                    <Link to={`/deletebook/${book._id}`} className="underline">Delete</Link>
                                </div>
                                {/* <Link to={`/book/${book._id}`}>View Details</Link> */}
                            </div>
                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                </div>
            </div>
            <div className="otherbooks mt-7 ">
                <div className="text-cyan-300 text-2xl mb-2">Other books</div>
                <div className="flex text-cyan-200 text-lg">
                    {otherrBooks.length > 0 ? (
                        otherrBooks.map((book) => (
                            <div key={book._id} style={{ width: "300px" }}>
                                <h3 className="truncate text-xl font-semibold">Title : {book.title}</h3>
                                <p className="truncate text-md">Genre : {book.genre}</p>
                                <p className="truncate text-md">Author : {book.author}</p>
                                <img
                                    src={book.coverimg}
                                    alt={`${book.title} cover`}
                                    className="w-32 h-48 object-cover rounded-lg mt-2 mb-2"
                                />
                                {/* <Link to={`/book/${book._id}`}>View Details</Link> */}
                            </div>
                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Allbooksuser;
