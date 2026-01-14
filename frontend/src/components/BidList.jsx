import { useState, useEffect } from "react";
import api from "../api/axios";

export default function BidList({ gig }) {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBids = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/bids/${gig._id}`);
            if (response.data.success) {
                setBids(response.data.bids);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBids();
    }, []);

    const handleHire = async (bidId) => {
        try {
            setLoading(true);
            const response = await api.patch(`/api/bids/${bidId}/hire`);
            if (response.data.success) {
                await fetchBids();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 mt-4 bg-white">
            <h3>Bids ({bids.length})</h3>
            {loading ? (
                <p>Loading...</p>
            ) : bids.length > 0 ? (
                <div>
                    {bids.map((bid) => (
                        <div key={bid._id} className="border-b pb-4 mb-4">
                            <p>
                                <strong>Freelancer:</strong>{" "}
                                {bid.freeLancerId?.name || "Unknown"}
                            </p>
                            <p>
                                <strong>Message:</strong> {bid.message}
                            </p>
                            <p>
                                <strong>Price:</strong> ${bid.price}
                            </p>
                            <p>
                                <strong>Status:</strong> {bid.status}
                            </p>
                            {bid.status === "pending" && (
                                <button
                                    onClick={() => handleHire(bid._id)}
                                    disabled={loading}
                                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                                >
                                    Hire
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bids for this gig yet</p>
            )}
        </div>
    );
}
