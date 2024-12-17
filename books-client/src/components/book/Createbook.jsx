import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Createbook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    genre: "",
    author: "",
    coverimg: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    console.log(e.target.files)

    if (type === 'file') {
      setBookData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    } else {
      setBookData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });
    try {
      const response = await axios.post('http://localhost:4000/api/books/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log('Registration successful:', response.data);
      alert("Book added")
      navigate('/allbooksuser')
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed!');
    }
  };

  if (loading) {
    return <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">Loading...</div>;
  }
  
  return (
    <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">
    <Link to="/allbooksuser" className="text-lg mb-4 inline-block">Back to All Books</Link>
    <div className="text-2xl font-semibold mb-6">Add Book</div>
  
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-cyan-300">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          id="title"
          className="w-72 p-2 mt-2 border border-cyan-500 rounded-md bg-slate-800 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
  
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-cyan-300">Genre</label>
        <input
          type="text"
          name="genre"
          onChange={handleChange}
          id="genre"
          className="w-72 p-2 mt-2 border border-cyan-500 rounded-md bg-slate-800 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
  
      <div>
        <label htmlFor="coverimg" className="block text-sm font-medium text-cyan-300">Cover Image</label>
        <input
          type="file"
          name="coverimg"
          onChange={handleChange}
          id="coverimg"
          className="w-72 p-2 mt-2 border border-cyan-500 rounded-md bg-slate-800 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
  
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-cyan-300">File</label>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          id="file"
          className="w-72 p-2 mt-2 border border-cyan-500 rounded-md bg-slate-800 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
  
      <div>
        <input
          type="submit"
          value="Submit"
          className="w-72 p-2 mt-4 bg-cyan-500 text-slate-700 rounded-md cursor-pointer hover:bg-cyan-600"
        />
      </div>
    </form>
  
    <div className="mt-6">
      <div className="text-lg font-medium">Book Data:</div>
      <div>Title: {bookData.title}</div>
      <div>Genre: {bookData.genre}</div>
      <div>Cover Image: {bookData.coverimg && bookData.coverimg.name}</div>
      <div>File: {bookData.file && bookData.file.name}</div>
    </div>
  </div>
  

  );
};

export default Createbook;
