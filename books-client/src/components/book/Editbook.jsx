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
            const response = await axios.get(`http://localhost:4000/api/books/${id}`);
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
            const response = await axios.patch(`http://localhost:4000/api/books/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            console.log('Updation successful:', response.data);
            alert("Book updated")
            navigate('/allbooks')
        } catch (error) {
            console.error('Error during updating:', error.response?.data || error.message);
            alert('Updation failed!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link to="/allbooks">Back to All Books</Link>
            <div>Edit Book</div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={bookData.title} onChange={handleChange} />
                <input type="text" name="genre" value={bookData.genre} onChange={handleChange} />
                <input type="file" name="coverimg" id="" onChange={handleChange} />
                <input type="file" name="file" id="" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
            {/* <div>{bookData}</div> */}
            {/* <div>{id}</div> */}
        </div>
    );
};

export default Editbook;
