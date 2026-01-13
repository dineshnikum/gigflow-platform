import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        register(formData);
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
                    <h1 className="text-4xl font-bold text-center">Register</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="border border-gray-300 rounded p-2"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>

                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
