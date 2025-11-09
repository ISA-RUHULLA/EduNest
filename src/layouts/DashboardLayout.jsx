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
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default DashboardLayout;
