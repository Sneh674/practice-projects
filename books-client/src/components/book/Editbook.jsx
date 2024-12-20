import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Editbook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const [loading, setLoading] = useState(false)
    // const [books, setBooks] = useState({})
    const [bookData, setBookData] = useState({
        title: "",
        genre: "",
        author: "",
        coverimg: "",
        file: "",
    });

    const fetchAPI = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/books/${id}`);
            console.log(response.data.book);
            // console.log(response.data);
            setBookData(response.data.book);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [id]);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        console.log(e.target.files);

        if (type === "file") {
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
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}api/books/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            console.log('Updation successful:', response.data);
            alert("Book updated")
            navigate('/allbooksuser')
        } catch (error) {
            console.error('Error during updating:', error.response?.data || error.message);
            alert('Updation failed!');
        }
    };

    if (loading) {
        return <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">Loading...</div>;
    }

    return (
        <div className="m-0 p-7 bg-slate-700 min-h-screen text-cyan-300">
    <Link to="/allbooksuser" className="text-xl underline">Back to All Books</Link>

    <div className="text-2xl mt-5 mb-4 font-semibold">Edit Book</div>

    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Title Field */}
        <label htmlFor="title" className="text-lg">Title:</label>
        <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-72 p-2 border border-cyan-500 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Genre Field */}
        <label htmlFor="genre" className="text-lg">Genre:</label>
        <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            className="w-72 p-2 border border-cyan-500 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Cover Image Field */}
        <label htmlFor="coverimg" className="text-lg">Cover Image:</label>
        <input
            type="file"
            name="coverimg"
            id="coverimg"
            onChange={handleChange}
            className="w-72 p-2 border border-cyan-500 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* File Field */}
        <label htmlFor="file" className="text-lg">Book File:</label>
        <input
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
            className="w-72 p-2 border border-cyan-500 bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Submit Button */}
        <input
            type="submit"
            value="Submit"
            className="w-72 p-2 mt-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-200"
        />
    </form>
</div>


    );
};

export default Editbook;
