import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Allbooks from "./components/book/Allbooks";
import Createbook from "./components/book/Createbook";
import Editbook from "./components/book/Editbook";
import Deletebook from "./components/book/Deletebook";

function AppContent() {
  const [count, setCount] = useState(0);

  const fecthAPI = async () => {
    try {
      const response = await axios.get("http://localhost:4000");
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      setCount(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      path: "/",
      element: <AppContent />,
    },
    {
      path: "/next",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/allbooks",
      element: <Allbooks />,
    },
    {
      path: "/createbook",
      element: <Createbook />,
    },
    {
      path: "/editbook/:id",
      element: <Editbook />,
    },
    {
      path:"/deletebook/:id",
      element: <Deletebook />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
