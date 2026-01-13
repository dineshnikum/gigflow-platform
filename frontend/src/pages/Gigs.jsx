import GigCard from "./GigCard";
import api from "../api/axios";
import { useEffect, useState } from "react";

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const response = await api.get("/api/gigs");
                setGigs(response.data.gigs || []);
            } catch (error) {
                console.error("Error fetching gigs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-6">Available Gigs</h1>

            <div className="grid gap-4">
                {loading ? (
                    <p>Loading gigs...</p>
                ) : gigs.length > 0 ? (
                    gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
                ) : (
                    <p>No gigs available</p>
                )}
            </div>
        </div>
    );
};

export default Gigs;
