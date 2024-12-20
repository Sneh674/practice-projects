import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import SearchBar from './SearchBar';

const SearchByAuthor = () => {
    const { author } = useParams(); // Get the author name from URL params
    const navigate = useNavigate();
    const [booksData, setBooksData] = useState([]);  // State to store books by authors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAPI = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/");
                return;
            }

            // API call to fetch books grouped by authors
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/books/searchbooksbyauthor/${author}`);
            setBooksData(response.data);  // Grouped authors and their books
            setLoading(false);
        } catch (error) {
            console.error(`Error: ${error}`);
            setError('Failed to fetch books for the given author.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [author]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-400 flex flex-col items-center px-4 py-6">
            <div className="w-full max-w-5xl">
                <div className="header flex items-center justify-between mb-6">
                    <Link to="/allbooksuser" className="text-blue-500 hover:text-blue-700 text-lg">Go Back</Link>
                    <SearchBar />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Books by Author: "{author}"
                </h2>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                {booksData.length === 0 ? (
                    <div className="text-gray-500 text-lg">
                        No books found for the author "{author}"
                    </div>
                ) : (
                    booksData.map((authorGroup, index) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{authorGroup.author}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {authorGroup.books.map((book) => (
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
                                        <p className="text-md text-gray-600 truncate">Author: {authorGroup.author}</p>
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchByAuthor;
