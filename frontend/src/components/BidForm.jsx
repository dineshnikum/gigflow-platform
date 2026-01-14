import { useState } from "react";
import api from "../api/axios";

export default function BidForm({ gig }) {
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/bids", {
                message,
                price,
                gigId: gig._id,
            });
            if (response.data.success) {
                console.log("Bid created successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setMessage("");
            setPrice("");
        }
    };

    return (
        <form className="flex justify-around mt-8" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border rounded p-2"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                type="number"
                className="border rounded p-2"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded cursor-pointer px-2"
            >
                Apply
            </button>
        </form>
    );
}
