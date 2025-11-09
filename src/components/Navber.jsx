import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // hook jodi context return kore

const Navber = () => {
    const { user, logoutUser } = useAuth(); // <-- useContext er proyojon nai

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold">
                <Link to="/">EduNest</Link>
            </h1>
            <nav>
                <Link to="/" className="mr-4 hover:underline">Home</Link>
                <Link to="/courses" className="mr-4 hover:underline">Courses</Link> 
                {
                    user && (
                        <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
                    )
                }
                <Link to="/about" className="mr-4 hover:underline">About Us</Link>
            </nav>
            <div>
                {user ? (
                    <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200" onClick={logoutUser}>
                        Logout
                    </button>
                ) : (
                    <Link className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navber;
