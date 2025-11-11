import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const CourseCard = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then((res) => res.json())
            .then((data) => {
                const topCourses = data.sort((a, b) => b.rating - a.rating);
                setCourses(topCourses);
            })
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/course/${id}`);
    };

    return (
        <div className="p-6 md:p-10 bg-blue-800 rounded-lg my-4">
            <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">🏆 Top Rated Courses</h2>
                <p className="text-white text-center mb-10">Explore our top-rated courses, carefully curated to help you <br /> achieve your learning goals with expert instructors and comprehensive content.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, index) => (
                    <AnimatedCourseCard
                        key={course._id}
                        course={course}
                        index={index}
                        handleViewDetails={handleViewDetails}
                    />
                ))}
            </div>
        </div>
    );
};

// 🔹 Animated Card Component
const AnimatedCourseCard = ({ course, index, handleViewDetails }) => {
    const controls = useAnimation();
    const [ref, setRef] = React.useState(null);

    React.useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start({
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: index * 0.1 },
                        });
                    } else {
                        controls.start({ opacity: 0, y: 80 }); // scroll out animation
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, controls, index]);

    return (
        <motion.div
            ref={setRef}
            initial={{ opacity: 0, y: 80 }}
            animate={controls}
            className="border rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 bg-blue-900"
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
                <span className="text-yellow-500 font-medium">⭐ {course.rating}</span>
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
        </motion.div>
    );
};

export default CourseCard;
