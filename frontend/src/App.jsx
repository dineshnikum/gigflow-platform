import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import CreateGig from "./pages/CreateGig";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useAuth } from "./context/authContext";

export default function App() {
    const { user } = useAuth();

    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gigs" element={<Gigs />} />
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
