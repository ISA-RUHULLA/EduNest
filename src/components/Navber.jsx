import React from 'react';
import { Link } from 'react-router-dom';


const Navber = () => {
    return (
        <div>
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                      <Link to="/">EduNest</Link>
                    </h1>
                    <nav>
                      <Link to="/" className="mr-4 hover:underline">Home</Link>
                      <Link to="/courses" className="mr-4 hover:underline">Courses</Link>
                      <Link to="/login" className="mr-4 hover:underline">Login</Link>
                      <Link to="/register" className="hover:underline">Register</Link>
                    </nav>
                  </header>
        </div>
    );
};

export default Navber;