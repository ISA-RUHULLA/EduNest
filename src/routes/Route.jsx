import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/Courses/CourseDetails";
import Notfound from "../pages/Home/Notfound";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AboutUs from "../pages/Home/AboutUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyEnrolled from "../pages/Dashboard/MyEnrolled";
import MyAddedCourse from "../pages/Dashboard/MyAddedCourse";
import AddCourse from "../pages/Dashboard/AddCourse";
import UpdateCourse from "../pages/Dashboard/UpdateCourse";
import PrivateRoute from "./PrivateRoute";

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
                path: "/course/:id",
                element: <PrivateRoute><CourseDetails /></PrivateRoute>,
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [

            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "my-courses",
                element: <MyEnrolled />
            },
            {
                path: "my-added-courses",
                element: <MyAddedCourse />
            },
            {
                path: "add-courses",
                element: <AddCourse />
            },
            {
                path: "update-course/:id",
                element: <UpdateCourse />
            }


        ],
    },
])

export default router;