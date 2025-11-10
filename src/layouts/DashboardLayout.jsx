// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navber from "../components/Navber";

const DashboardLayout = () => {
    const { user } = useAuth();

    return (
        <div>
            <div>
                <Navber />
            </div>
            <div className="flex min-h-screen">
                <aside className="w-64 bg-blue-800 text-white p-6">
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                        <Link to="/dashboard/my-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">My Enrolled</Link>
                        <Link to="/dashboard/add-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">Add new course</Link>
                        <Link to="/dashboard/my-added-courses" className="btn btn-primary block py-2 px-4 rounded hover:bg-gray-700">My Add Course</Link>
                    </nav>
                </aside>
                <main className="flex-1 p-6 bg-blue-300">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;
