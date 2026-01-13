import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 fixed top-0 w-full">
                <div className="container mx-auto flex justify-center">
                    <ul className="flex space-x-20">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/browse-open-gigs"
                                className="hover:underline"
                            >
                                Browse Open Gigs
                            </Link>
                        </li>
                        <li>
                            <Link to="/create-gig" className="hover:underline">
                                Create Gig
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
