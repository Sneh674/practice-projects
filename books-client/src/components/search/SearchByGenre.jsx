import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import SearchBar from './SearchBar';

const SearchByGenre = () => {
    const { genre } = useParams(); // Use genre from URL params
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAPI = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/");
                return;
            }
            const response = await axios.get(`http://localhost:4000/api/books/searchbygenre/${genre}`);
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            console.error(`Error: ${error}`);
            setBooks([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [genre]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-400 flex flex-col items-center px-4 py-6">
            <div className="w-full max-w-5xl">
                <div className="header flex items-center justify-between mb-6">
                    <Link to="/allbooksuser" className="text-blue-500 hover:text-blue-700 text-lg">Go Back</Link>
                    <SearchBar />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Books Search Results for Genre "{genre}"
                </h2>

                {books.length === 0 ? (
                    <div className="text-gray-500 text-lg">
                        No books found for the genre "{genre}"
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-200"
                            >
                                <img
                                    src={book.coverimg}
                                    alt={`${book.title} cover`}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 truncate">{book.title}</h3>
                                <p className="text-md text-gray-600 truncate">Genre: {book.genre}</p>
                                <p className="text-md text-gray-600 truncate">Author: {book.author}</p>
                                <div className="mt-3">
                                    <p className="truncate text-md text-gray-600">File: </p>
                                    <a
                                        href={book.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline hover:text-blue-700"
                                    >
                                        View/Download File
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchByGenre;
