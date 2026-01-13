import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome {user && user.name} 👋
                </h1>

                <div className="flex flex-col gap-4 mt-10">
                    <Link
                        to="/browse-open-gigs"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Browse Open Gigs
                    </Link>

                    <Link
                        to="/create-gig"
                        className={`bg-green-600 text-white py-2 rounded hover:bg-green-700 ${
                            !user ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Create a Gig
                    </Link>

                    {!user && (
                        <div className="flex justify-center gap-4 mt-2">
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
