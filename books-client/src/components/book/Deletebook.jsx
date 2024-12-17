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
    console.log("fecting api")
    fetchAPI();
  }, []);

  const handleClick = async () => {
    setLoading(true)
    try {
      console.log("trial")
      const response = await axios.delete(`http://localhost:4000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log("trial")
      console.log('Deletion successful:', response.data);
      alert("Book deleted")
      navigate('/allbooks')
    } catch (error) {
      console.error('Error during deleting:', error.response?.data || error.message);
      alert('Deletion failed!');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Link to="/allbooks">Back to All Books</Link>
      <div>Delete Book</div>
      <div>
        <li>Title: {bookData.title}</li>
        <li><img src={bookData.coverimg} alt={bookData.title} style={{ width: "100px", height: "100px" }} /></li>
      </div>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default Deletebook;
