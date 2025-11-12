import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navber = () => {
    const { user, logoutUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
                {/* Brand Name */}
                <h1 className="text-3xl md:text-4xl font-bold">
                    <Link to="/">EduNest</Link>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4 items-center">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/courses" className="hover:underline">Courses</Link>
                    {user && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
                    <Link to="/about" className="hover:underline">About Us</Link>
                </nav>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="hidden md:flex bg-white text-blue-600 dark:bg-gray-700 dark:text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    {user ? (
                        <>
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

                    {/* Hamburger Button (Mobile) */}
                    <button
                        className="md:hidden flex flex-col space-y-1 ml-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="flex flex-col space-y-2 mt-2 md:hidden bg-blue-500 p-4 rounded-lg">
                    <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/courses" className="hover:underline" onClick={() => setIsOpen(false)}>Courses</Link>
                    {user && <Link to="/dashboard" className="hover:underline" onClick={() => setIsOpen(false)}>Dashboard</Link>}
                    <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About Us</Link>
                </nav>
            )}
        </header>
    );
};

export default Navber;
