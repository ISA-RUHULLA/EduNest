import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navber = () => {
    const { user, logoutUser } = useAuth();

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            {/* Brand Name */}
            <h1 className="text-4xl font-bold">
                <Link to="/">EduNest</Link>
            </h1>

            {/* Navigation Links */}
            <nav>
                <Link to="/" className="mr-4 hover:underline">Home</Link>
                <Link to="/courses" className="mr-4 hover:underline">Courses</Link>
                {user && (
                    <Link to="/dashboard" className="mr-4 hover:underline">
                        Dashboard
                    </Link>
                )}
                <Link to="/about" className="mr-4 hover:underline">About Us</Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        {/* User Profile Image */}
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200"
                        to="/login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navber;
