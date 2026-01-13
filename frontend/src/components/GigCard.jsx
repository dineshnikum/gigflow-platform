const GigCard = ({ gig }) => {
    return (
        <div className="border rounded-lg p-4 hover:shadow-sm transition">
            <h2 className="text-lg font-medium">{gig.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{gig.description}</p>
            <div className="flex items-center justify-between mt-4">
                <span className="font-semibold">₹ {gig.budget}</span>
                <button className="text-sm text-blue-600 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
                    Apply
                </button>
            </div>
        </div>
    );
};

export default GigCard;
