import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Allbooksuser = () => {
    const [userrBooks, setUserrBooks] = useState([]);
    const [otherrBooks, setOtherrBooks] = useState([]);

    const fetchAPI = async () => {
        try {
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
        <div>
            <Link to="/createbook">Add Book</Link>
            <div className="userbooks">
                <div>All user books</div>
                <div style={{ display: 'flex' }}>
                    {userrBooks.length > 0 ? (
                        userrBooks.map((book) => (
                            <div key={book._id} style={{ width: '500px' }}>
                                <h3>{book.title}</h3>
                                <p>Genre: {book.genre}</p>
                                <p>Author: {book.author}</p>
                                <img
                                    src={book.coverimg}
                                    alt={`${book.title} cover`}
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <br />
                                <Link to={`/editbook/${book._id}`}>Edit</Link>
                                <br />
                                <Link to={`/deletebook/${book._id}`}>Delete</Link>
                                {/* <Link to={`/book/${book._id}`}>View Details</Link> */}
                            </div>
                        ))
                    ) : (
                        <p>No books available.</p>
                    )}
                </div>
            </div>
            <div className="otherbooks">
                <div>Other books</div>
                <div style={{ display: 'flex' }}>
                    {otherrBooks.length > 0 ? (
                        otherrBooks.map((book) => (
                            <div key={book._id} style={{ width: '500px' }}>
                                <h3>{book.title}</h3>
                                <p>Genre: {book.genre}</p>
                                <p>Author: {book.author}</p>
                                <img
                                    src={book.coverimg}
                                    alt={`${book.title} cover`}
                                    style={{ width: "100px", height: "100px" }}
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
