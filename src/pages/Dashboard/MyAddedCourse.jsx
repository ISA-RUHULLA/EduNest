import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyAddedCourses = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return; // user null check
        setLoading(true);

        axios
        .get(`https://edu-nest-server-lake.vercel.app/courses/user/${user.email}`)
            .then((res) => setCourses(res.data))
            .catch((err) => toast.error("Failed to fetch courses", err))
            .finally(() => setLoading(false));
    }, [user]);

    // Delete course
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this course?");
        if (!confirm) return;

        try {
            const res = await fetch(`https://edu-nest-server-lake.vercel.app/courses/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                toast.success("✅ Course deleted successfully");
                setCourses(courses.filter((c) => c._id !== id)); // UI update
            } else {
                toast.error(" Failed to delete course");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    // Navigate to UpdateCourse page
    const handleUpdate = (id) => {
        navigate(`/dashboard/update-course/${id}`);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!courses.length) return <p className="text-center mt-10">No courses added yet.</p>;

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 p-6">
            {courses.map((course) => (
                <div
                    key={course._id}
                    className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
                >
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-bold text-black">{course.title}</h3>
                    <p className="text-gray-500 text-sm">{course.category}</p>
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={() => handleUpdate(course._id)}
                            className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyAddedCourses;
