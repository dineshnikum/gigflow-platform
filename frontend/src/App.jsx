import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseOpenGigs from "./pages/BrowseOpenGigs";
import CreateGig from "./pages/CreateGig";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useAuth } from "./context/authContext";

export default function App() {
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:5000");

            socket.emit("setup", user._id);

            socket.on("notification", (notification) => {
                if (notification.type === "hired") {
                    toast.success(notification.message);
                }
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [user]);

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/browse-open-gigs" element={<BrowseOpenGigs />} />
                <Route
                    path="/create-gig"
                    element={
                        <ProtectedRoute>
                            <CreateGig />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
