import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // 🔹 Step 1: Show loader while checking auth state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 🔹 Step 2: If user is logged in, allow access
    if (user) {
        return children;
    }

    // 🔹 Step 3: If not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
