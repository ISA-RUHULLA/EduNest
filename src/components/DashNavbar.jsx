import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DashNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div>
                <button
                    className="md:hidden flex flex-col space-y-1 ml-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                </button>
                {isOpen && (
                    <nav className="flex flex-col space-y-2 mt-2 md:hidden bg-blue-500 p-4 rounded-lg">
                        <Link to="/dashboard" className="hover:underline" onClick={() => setIsOpen(false)}>Dashboard</Link>
                        <Link to="/dashboard/my-courses" className="hover:underline" onClick={() => setIsOpen(false)}>My Enrolled</Link>
                        <Link to="/dashboard/add-courses" className="hover:underline" onClick={() => setIsOpen(false)}>Add new course</Link>
                        <Link to="/dashboard/my-added-courses" className="hover:underline" onClick={() => setIsOpen(false)}>My Add Course</Link>
                    </nav>
                )}
            </div>
            <nav className="hidden md:flex flex-col space-y-4">
                <Link to="/dashboard" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                <Link to="/dashboard/my-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">My Enrolled</Link>
                <Link to="/dashboard/add-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">Add new course</Link>
                <Link to="/dashboard/my-added-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">My Add Course</Link>
            </nav>
        </div>
    );
};

export default DashNavbar;