import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function GigDetails() {
    const { gigId } = useParams();
    const [gig, setGig] = useState(null);

    useEffect(() => {
        const fetchGig = async () => {
            try {
                const response = await api.get(`/api/gigs/${gigId}`);
                setGig(response.data.gig);
            } catch (error) {
                console.error("Error fetching gig:", error);
            }
        };
        fetchGig();
    }, [gigId]);

    console.log(gig);

    return (
        <div>
            <h1>Gig Details</h1>
        </div>
    );
}
