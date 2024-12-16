import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Createbook = () => {
    const navigate = useNavigate();
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
  
  const handleSubmit =async(e) => {
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
      navigate('/allbooks')
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed!');
    }
  };
  return (
    <div>
      <Link to="/allbooks">Back to All Books</Link>
      <div>Add book</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} />
        <input type="text" name="genre" onChange={handleChange}/>
        <input type="file" name="coverimg" id="" onChange={handleChange}/>
        <input type="file" name="file" id="" onChange={handleChange}/>
        <input type="submit" value="Submit" />
      </form>
      <div>{bookData.title}</div>
      <div>{bookData.coverimg && bookData.coverimg.name}</div>
      <div>{bookData.file && bookData.file.name}</div>
    </div>
  );
};

export default Createbook;
