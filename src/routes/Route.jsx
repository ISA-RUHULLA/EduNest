import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/Courses/CourseDetails";
import Notfound from "../pages/Home/Notfound";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import StudentDashboard from "../pages/Dashboard/Student/StudentDashboard";
import Profile from "../pages/Dashboard/Student/Profile";
import TeacherDashboard from "../pages/Dashboard/Teacher/TeacherDashboard";
import AddCourses from "../pages/Dashboard/Teacher/AddCourses";
import AllCourses from "../pages/Dashboard/Student/AllCourses";
import StudentCourses from "../pages/Dashboard/Student/StudentCourses";
import TeacherCourses from "../pages/Dashboard/Teacher/TeacherCourses";
import TeacherProfile from "../pages/Dashboard/Teacher/TeacherProfile";
import RoleBasedRoute from "./RolebaseRoute";
import AboutUs from "../pages/Home/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/courses",
                element: <Courses />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            { path: "/courses/:id", element: <CourseDetails /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "*", element: <Notfound /> },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            // Student routes
            {
                path: "student/dashboard",
                element: (
                    <RoleBasedRoute allowedRole="student">
                        <StudentDashboard />
                    </RoleBasedRoute>
                ),
            },
            {
                path: "student/my-courses",
                element: (
                    <RoleBasedRoute allowedRole="student">
                        <StudentCourses />
                    </RoleBasedRoute>
                ),
            },
            {
                path: "student/all-courses",
                element:(
                    <RoleBasedRoute allowedRole="student">
                        <AllCourses />
                    </RoleBasedRoute>
                )
            },
            {
                path: "student/profile",
                element: (
                    <RoleBasedRoute allowedRole="student">
                        <Profile/>
                    </RoleBasedRoute>
                ),
            },

            // Teacher routes
            {
                path: "teacher/home",
                element: (
                    <RoleBasedRoute allowedRole="teacher">
                        <TeacherDashboard />
                    </RoleBasedRoute>
                ),
            },
            {
                path: "teacher/add-course",
                element: (
                    <RoleBasedRoute allowedRole="teacher">
                        <AddCourses />
                    </RoleBasedRoute>
                ),
            },
            {
                path: "teacher/my-courses",
                element: (
                    <RoleBasedRoute allowedRole="teacher">
                        <TeacherCourses />
                    </RoleBasedRoute>
                ),
            },
            {
                path: "teacher/profile",
                element: (
                    <RoleBasedRoute allowedRole="teacher">
                    <TeacherProfile/>
                    </RoleBasedRoute>
                )
            }
        ],
    },
])

export default router;