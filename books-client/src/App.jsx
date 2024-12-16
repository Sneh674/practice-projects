import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';

function AppContent() {
  const [count, setCount] = useState(0);

  const fecthAPI = async () => {
    try {
      const response = await axios.get('http://localhost:4000');
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      setCount(response.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fecthAPI();
  }, []);

  return (
    <div>
      <h1>hello</h1>
      <div>{count}</div>
      <Link to="/next">Next</Link>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppContent />,
    },
    {
      path: '/next',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
