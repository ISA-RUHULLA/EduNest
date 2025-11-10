import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then((res) => res.json())
            .then((data) => {
                // 🔹 Sort by rating (descending) & take top 6
                const topCourses = data
                    .sort((a, b) => b.rating - a.rating)
                    
                setCourses(topCourses);
            })
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    // 🔹 Handle course details navigation
    const handleViewDetails = (id) => {
        navigate(`/course/${id}`);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top Rated Courses</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="border rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="rounded-lg mb-3 w-full h-48 object-cover"
                        />
                        <h2 className="text-lg font-semibold">{course.title}</h2>
                        <p className="text-gray-500 text-sm">{course.instructor}</p>
                        <p className="text-sm mt-2">{course.short_description}</p>
                        <div className="flex justify-between items-center mt-3">
                            <span className="font-bold text-blue-600">${course.price}</span>
                            <span className="text-yellow-500 font-medium">
                                ⭐ {course.rating}
                            </span>
                        </div>
                        <div className="flex justify-between mt-4 gap-2 w-full">
                            <button
                                className="btn btn-primary w-1/2"
                                onClick={() => handleViewDetails(course._id)}
                            >
                                View Details
                            </button>
                            <button className="btn btn-primary w-1/2">Enroll Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCard;
