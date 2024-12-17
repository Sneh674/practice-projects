import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        formData
      );
      console.log("Registration successful:", response.data);
      console.log("Login successful:", response.data);
      const token = response.data.accesstoken;
      localStorage.setItem("authToken", token);
      navigate("/allbooksuser");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      alert("Registration failed!");
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

      <div className="text-2xl font-semibold mb-6">Register Page</div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        {/* Name Field */}
        <label htmlFor="name" className="text-sm text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
        <input
          type="text"
          name="password"
          id="password"
          onChange={handleChange}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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

export default Register;
