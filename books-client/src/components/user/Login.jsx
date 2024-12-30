import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/users/login`, formData);
      console.log('response: ', response);
      console.log('Login successful:', response.data);
      const token = response.data.accesstoken;
      localStorage.setItem('authToken', token);
      navigate('/allbooksuser');
    } catch (error) {
      console.error('Error during Login:', error.response?.data || error.message);
      alert('Login failed!');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <Link
        to="/next"
        className="text-blue-400 hover:text-blue-500 text-lg mb-4"
      >
        Back
      </Link>

      <div className="text-2xl font-semibold mb-6">Login Page</div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        {/* Email Field */}
        <label htmlFor="email" className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password Field */}
        <label htmlFor="password" className="text-sm text-gray-300">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            onChange={handleChange}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Link to="/forgotpassword" className="text-red-600">Forgot Password</Link>

        {/* Submit Button */}
        <input
          type="submit"
          value="Submit"
          className="mt-4 p-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-200"
        />
      </form>
    </div>
  );
};

export default Login;
