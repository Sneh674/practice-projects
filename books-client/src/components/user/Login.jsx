import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:4000/api/users/login', formData);
      console.log("response: ",response)
      console.log('Login successful:', response.data);
      const token = response.data.accesstoken;
      localStorage.setItem('authToken', token);
      navigate('/allbooks')
    } catch (error) {
      console.error('Error during Login:', error.response?.data || error.message);
      alert('Login failed!');
    }
  }
  return (
    <div>
      <Link to="/next">back</Link>
      <div>Login Page</div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="" onChange={handleChange} />
        <input type="text" name="password" id="" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login
