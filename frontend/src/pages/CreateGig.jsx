import api from "../api/axios";
import { useState } from "react";

export default function CreateGig() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/gigs", formData);
            if (response.data.success) {
                console.log("Gig created successfully");
                e.target.reset();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFormData({
                title: "",
                description: "",
                budget: "",
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Create a Gig</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Gig Title
                        </label>
                        <input
                            type="text"
                            placeholder="Build a React website"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.title}
                            onChange={handleChange}
                            name="title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Describe your gig requirements..."
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.description}
                            onChange={handleChange}
                            name="description"
                            required
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Budget
                        </label>
                        <input
                            type="number"
                            placeholder="5000"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.budget}
                            onChange={handleChange}
                            name="budget"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Create Gig
                    </button>
                </form>
            </div>
        </div>
    );
}
