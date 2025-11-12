import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AddCourse = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        thumbnail: "",
        short_description: "",
        price: "",
        rating: "",
        duration: "",
        lessons: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseData = {
            ...formData,
            instructor: user?.displayName || "Anonymous",
            instructor_email: user?.email,
        };

        fetch("https://edu-nest-server-lake.vercel.app/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("🎉 Course added successfully!");
                    setTimeout(() => {
                        navigate("/dashboard/my-added-courses");
                    }, 1500);
                } else {
                    toast.error("❌ Failed to add course!");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("⚠️ Something went wrong!");
            });
    };

    return (
        <div className="max-w-xl mx-auto bg-blue-400 shadow-lg rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                🚀 Launch a New Course
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="w-full border p-2 rounded"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        step="0.1"
                        max="5"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g., 10 hours)"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="lessons"
                        value={formData.lessons}
                        onChange={handleChange}
                        placeholder="Lessons"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category (e.g., Web Development)"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse;
