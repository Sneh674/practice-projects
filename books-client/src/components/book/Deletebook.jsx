import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Deletebook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [loading, setLoading] = useState(false);

  const [bookData, setBookData] = useState({
    title: "",
    genre: "",
    author: "",
    coverimg: "",
    file: "",
  });

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/books/${id}`);
      console.log(response.data.book);
      // console.log(response.data);
      setBookData(response.data.book);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("fecting api");
    fetchAPI();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      console.log("trial");
      const response = await axios.delete(
        `http://localhost:4000/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("trial");
      console.log("Deletion successful:", response.data);
      alert("Book deleted");
      navigate("/allbooksuser");
    } catch (error) {
      console.error(
        "Error during deleting:",
        error.response?.data || error.message
      );
      alert("Deletion failed!");
    }
  };

  if (loading) {
    return <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">Loading...</div>;
  }

  return (
    <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">
      <Link to="/allbooksuser" className="text-lg mb-4 inline-block">
        Back to All Books
      </Link>

      <div className="text-2xl font-semibold mb-6">Delete Book</div>

      <div className="mb-6">
        <ul className="list-none space-y-4">
          <li className="text-lg font-medium">Title: {bookData.title}</li>
          <li>
            <img
              src={bookData.coverimg}
              alt={bookData.title}
              className="w-32 h-48 object-cover rounded-lg border border-cyan-500"
            />
          </li>
        </ul>
      </div>

      <button
        onClick={handleClick}
        className="w-72 p-2 mt-4 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default Deletebook;
