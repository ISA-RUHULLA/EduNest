// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Role-based sidebar links */}
        {user?.role === "student" && (
          <>
            <Link to="/dashboard/student/home" className="mb-2 hover:underline">Home</Link>
            <Link to="/dashboard/student/my-courses" className="mb-2 hover:underline">My Courses</Link>
            <Link to="/dashboard/student/all-courses" className="mb-2 hover:underline">All Courses</Link>
            <Link to="/dashboard/student/profile" className="mb-2 hover:underline">Profile</Link>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Link to="/dashboard/teacher/home" className="mb-2 hover:underline">Home</Link>
            <Link to="/dashboard/teacher/add-course" className="mb-2 hover:underline">Add Course</Link>
            <Link to="/dashboard/teacher/my-courses" className="mb-2 hover:underline">My Courses</Link>
            <Link to="/dashboard/teacher/profile" className="mb-2 hover:underline">Profile</Link>
          </>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
