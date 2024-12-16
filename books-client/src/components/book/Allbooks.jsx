import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const Allbooks = () => {
  const [books, setBooks] = useState(0);

  const fecthAPI = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/books");
      console.log(response);
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fecthAPI();
  }, []);

  return (
    <div>
        <Link to="/createbook">Add Book</Link>
      <div>All books</div>
      <div style={{display: 'flex'}}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} style={{width: '500px'}}>
              <h3>{book.title}</h3>
              <p>Genre: {book.genre}</p>
              <p>Author: {book.author}</p>
              <img
                src={book.coverimg}
                alt={`${book.title} cover`}
                style={{ width: "100px", height: "100px" }}
              />
              <Link to={`/editbook/${book._id}`}>Edit</Link>
              {/* <Link to={`/book/${book._id}`}>View Details</Link> */}
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default Allbooks;
