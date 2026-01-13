import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col gap-4 w-full max-w-md border border-gray-300 px-6 py-10 rounded-xl bg-white">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-center">Login</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded p-2"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded p-2"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
