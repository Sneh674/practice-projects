import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";

const Allbooksuser = () => {
  const navigate = useNavigate();
  const [userrBooks, setUserrBooks] = useState([]);
  const [otherrBooks, setOtherrBooks] = useState([]);

  const fetchAPI = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
      }
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // console.log(response.data.userBooks);
      setUserrBooks(response.data.userBooks);
      // console.log(response.data.otherBooks);
      setOtherrBooks(response.data.otherBooks);
      // setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="m-0 p-0 bg-slate-500 min-h-screen">
      <div className="linkbutton flex flex-wrap justify-between items-center gap-4 p-5 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500">
        <button
          onClick={handleLogOut}
          className="text-cyan-500 text-lg bg-slate-800 p-2 rounded-md hover:bg-cyan-500 hover:text-slate-800 transition-all duration-200"
        >
          Log Out
        </button>
        <div className="flex-1 min-w-[200px]">
          <SearchBar />
        </div>
        <Link
          to="/createbook"
          className="text-cyan-500 text-lg bg-slate-800 p-2 rounded-md hover:bg-cyan-500 hover:text-slate-800 transition-all duration-200"
        >
          Add Book
        </Link>
      </div>

      <div className="userbooks p-5 pt-12 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700">
        <div className="text-cyan-300 text-2xl mb-2">Your books</div>
        <div className="flex text-cyan-200 text-lg flex-wrap justify-evenly">
          {userrBooks.length > 0 ? (
            userrBooks.map((book) => (
              <div key={book._id} style={{ width: "300px" }} className="mb-5">
                <h3 className="truncate text-xl font-semibold mt-5">
                  Title : {book.title}
                </h3>
                <p className="truncate text-md">Genre : {book.genre}</p>
                <p className="truncate text-md">Author : {book.author}</p>
                <img
                  src={book.coverimg}
                  alt={`${book.title} cover`}
                  className="w-32 h-48 object-cover rounded-lg mt-2 mb-2 border border-cyan-500 hover:shadow-xl hover:shadow-cyan-500 transition-all duration-200"
                />
                <div className="mt-2">
                  <p className="truncate text-md">File: </p>
                  <a
                    href={book.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:shadow-xl hover:shadow-cyan-500 transition-all duration-200"
                  >
                    View/Download File
                  </a>
                </div>
                <div className="links flex flex-col space-y-2 mt-2">
                  <Link to={`/editbook/${book._id}`} className="underline">
                    Edit
                  </Link>
                  <Link to={`/deletebook/${book._id}`} className="underline">
                    Delete
                  </Link>
                </div>
                {/* <Link to={`/book/${book._id}`}>View Details</Link> */}
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </div>
      <div className="otherbooks p-5 pt-12 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500">
        <div className="text-cyan-300 text-2xl mb-2">Other books</div>
        <div className="flex text-cyan-200 text-lg flex-wrap justify-evenly">
          {otherrBooks.length > 0 ? (
            otherrBooks.map((book) => (
              <div key={book._id} style={{ width: "300px" }} className="mb-5">
                <h3 className="truncate text-xl font-semibold mt-5">
                  Title : {book.title}
                </h3>
                <p className="truncate text-md">Genre : {book.genre}</p>
                <p className="truncate text-md">Author : {book.author}</p>
                <img
                  src={book.coverimg}
                  alt={`${book.title} cover`}
                  className="w-32 h-48 object-cover rounded-lg mt-2 mb-2 border border-cyan-500 hover:shadow-xl hover:shadow-cyan-500 transition-all duration-200"
                />
                <div className="mt-2">
                  <p className="truncate text-md">File: </p>
                  <a
                    href={book.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:shadow-xl hover:shadow-cyan-500 transition-all duration-200"
                  >
                    View/Download File
                  </a>
                </div>
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
