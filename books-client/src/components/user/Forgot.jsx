import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Forgot = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [wait, setWait] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setWait(true)
        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/users/forgotpassword`,
                {
                    email,
                }
            );
            console.log(response.data);

            setMessage("Reset token has been sent to your email.");
            navigate('/resetpassword')
            setWait(false)
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Something went wrong";
            setError(errorMessage);
            setWait(false)
        }
    };

    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
        >

            <Link to='/login' className="text-cyan-600">Go Back</Link>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        color: "#fff",
                        backgroundColor: "#007bff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Send Reset Link
                </button>
            </form>
            {message && (
                <p style={{ color: "green", marginTop: "20px" }}>{message}</p>
            )}
            {wait && (
                <p style={{ color: "orange", marginTop: "20px" }}>Please wait....</p>
            )}
            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        </div>
    );
};

export default Forgot;
