import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetails from "./pages/GigDetails";
import CreateGig from "./pages/CreateGig";
import { ToastContainer } from "react-toastify";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gigs" element={<Gigs />} />
                <Route path="/gig/:id" element={<GigDetails />} />
                <Route path="/create-gig" element={<CreateGig />} />
            </Routes>
        </div>
    );
}
