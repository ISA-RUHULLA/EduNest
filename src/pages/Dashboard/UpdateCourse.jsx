import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            toast.error("Invalid course ID");
            setLoading(false);
            return;
        }

        fetch(`https://edu-nest-server-lake.vercel.app/courses/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Course not found");
                return res.json();
            })
            .then((data) => setFormData(data))
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...dataToUpdate } = formData; // Remove _id
            const res = await fetch(`https://edu-nest-server-lake.vercel.app/courses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToUpdate),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success("✅ Course updated successfully");
                navigate("/dashboard/my-added-courses");
            } else {
                toast.error(data.message || "❌ Failed to update course");
            }
        } catch (err) {
            toast.error("⚠️ Something went wrong! " + err.message);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto bg-blue-400 shadow-lg rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                ✏️ Update Course
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail || ""}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="short_description"
                    value={formData.short_description || ""}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="w-full border p-2 rounded"
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating || ""}
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
                        value={formData.duration || ""}
                        onChange={handleChange}
                        placeholder="Duration"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="lessons"
                        value={formData.lessons || ""}
                        onChange={handleChange}
                        placeholder="Lessons"
                        className="w-full border p-2 rounded"
                    />
                </div>
                <input
                    type="text"
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Update Course
                </button>
            </form>
        </div>
    );
};

export default UpdateCourse;
