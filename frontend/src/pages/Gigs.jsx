import GigCard from "../components/GigCard";
import api from "../api/axios";
import { useEffect, useState } from "react";

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const response = await api.get("/api/gigs", {
                    params: {
                        search,
                    },
                });
                setGigs(response.data.gigs || []);
            } catch (error) {
                console.error("Error fetching gigs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [search]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-6">Available Gigs</h1>

            <form
                className="mb-6 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    className="border rounded px-4 py-2 w-full"
                    placeholder="Search gigs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                    onClick={() => setSearch(search)}
                >
                    Search
                </button>
            </form>

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
