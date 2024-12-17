import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Our Platform</h1>
      <p className="text-sm mb-6 text-gray-400">Please login or register to get started.</p>

      <div className="space-y-4">
        <Link
          to="/login"
          className="text-lg font-medium px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-lg font-medium px-6 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>

  )
}

export default Home
