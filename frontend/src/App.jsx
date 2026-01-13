import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseOpenGigs from "./pages/BrowseOpenGigs";
import CreateGig from "./pages/CreateGig";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import GigDetails from "./pages/GigDetails";
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
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/browse-open-gigs" element={<BrowseOpenGigs />} />
                <Route path="/gig/:gigId" element={<GigDetails />} />
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
