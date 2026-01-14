import { useState } from "react";
import { useAuth } from "../context/authContext";
import BidForm from "./BidForm";
import BidList from "./BidList";

const GigCard = ({ gig }) => {
    const [showDetails, setShowDetails] = useState(false);
    const { user } = useAuth();

    const isGigOwner = user && user._id === gig.ownerId;

    return (
        <div className="border rounded-lg p-4 hover:shadow-sm transition">
            <h2 className="text-lg font-medium">{gig.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{gig.description}</p>
            <div className="flex items-center justify-between mt-4">
                <span className="font-semibold">₹ {gig.budget}</span>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm text-blue-600 cursor-pointer bg-gray-600 text-white px-4 py-2 rounded"
                >
                    {showDetails ? "Close" : "Details"}
                </button>
            </div>

            {showDetails &&
                (isGigOwner ? <BidList gig={gig} /> : <BidForm gig={gig} />)}
        </div>
    );
};

export default GigCard;
