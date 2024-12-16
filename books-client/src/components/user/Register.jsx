import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', formData);
      console.log('Registration successful:', response.data);
      navigate('/allbooks')
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed!');
    }
  }
  return (
    <div>
      <Link to="/next">back</Link>
      <div>Register Page</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" onChange={handleChange} />
        <input type="email" name="email" id="" onChange={handleChange} />
        <input type="text" name="password" id="" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Register
