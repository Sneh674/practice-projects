import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Allbooks from "./components/book/Allbooks";
import Createbook from "./components/book/Createbook";
import Editbook from "./components/book/Editbook";
import Deletebook from "./components/book/Deletebook";
import Allbooksuser from "./components/book/Allbooksuser";
import SearchByTitle from "./components/search/SearchByTitle";
import SearchByGenre from "./components/search/SearchByGenre";
import Forgot from "./components/user/Forgot";
import Reset from "./components/user/Reset";
import SearchByAuthor from "./components/search/SearchByAuthor";

function AppContent() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const fecthAPI = async () => {
    try {
      // console.log("Backend URL:", import.meta.env.REACT_APP_BACKEND_URL);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}`
      );
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      setCount(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/allbooksuser");
    }
    fecthAPI();
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 text-white min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-extrabold mb-4">Hello</h1>
      <div className="text-2xl font-semibold mb-6">{count}</div>
      <Link
        to="/next"
        className="px-6 py-3 bg-indigo-500 text-lg font-medium rounded-md hover:bg-indigo-600 transition duration-300"
      >
        Next
      </Link>
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
      path:'/forgotpassword',
      element: <Forgot />
    },
    {
      path: '/resetpassword',
      element: <Reset />
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
      path: "/deletebook/:id",
      element: <Deletebook />,
    },
    {
      path: "/allbooksuser",
      element: <Allbooksuser />
    },
    {
      path: "/searchbytitle/:title",
      element: <SearchByTitle />
    },
    {
      path: "/searchbygenre/:genre",
      element: <SearchByGenre />
    },
    {
      path: "/searchbyauthor/:author",
      element: <SearchByAuthor />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
