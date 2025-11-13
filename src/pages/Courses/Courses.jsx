import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Loader from "../../components/Loader"
import axios from "axios";

const CourseCard = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get("https://edu-nest-server-lake.vercel.app/courses")
            .then((res) => {
                const sorted = res.data.sort((a, b) => b.rating - a.rating);
                setCourses(sorted);
                setFilteredCourses(sorted);

                
                const cats = ["All", ...new Set(data.map(course => course.category))];
                setCategories(cats);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error)
                setLoading(false);
            });
            
    }, []);

    
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === "All") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course => course.category === cat);
            setFilteredCourses(filtered);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/course/${id}`);
    };
    if(loading){
        return(
            <Loader/>
        )
    }

    return (
        <div className="p-6 md:p-10 dark:bg-gray-400 rounded-lg my-4 shadow">
            <div>
                <h2 className="text-2xl md:text-4xl dark:text-white font-bold mb-6 text-center">🏆 Top Rated Courses</h2>
                <p className="text-black text-center mb-6">
                    Explore our top-rated courses, carefully curated to <br /> help you achieve your learning goals.
                </p>

                
                <div className="flex justify-center flex-wrap gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-lg font-semibold ${selectedCategory === cat
                                ? "text-white bg-blue-800"
                                : "bg-blue-600 text-white hover:bg-blue-500"
                                }`}
                            onClick={() => handleCategoryChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, index) => (
                    <AnimatedCourseCard
                        key={course._id}
                        course={course}
                        index={index}
                        handleViewDetails={handleViewDetails}
                    />
                ))}
            </div>

            <div className="flex items-center justify-center mt-6">
                <Link to="/" className="btn btn-primary mt-4">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};


const AnimatedCourseCard = ({ course, handleViewDetails }) => {
   

    return (
        <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} 
            transition={{
                duration: 0.15,
                delay: 0,
                ease: "easeOut",
            }}
            whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
            }}

            className=" rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 bg-blue-900 flex flex-col text-center"
        >
            <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-lg mb-3 w-full h-80 object-cover"
            />
            <h2 className="text-lg text-white font-semibold">{course.title}</h2>
            <p className="text-white text-sm">{course.instructor}</p>
            <p className="text-sm text-white mt-2">{course.short_description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-blue-600">${course.price}</span>
                <span className="text-yellow-500 font-medium">⭐ {course.rating}</span>
            </div>
            <div className="flex justify-between mt-auto pt-4 gap-2 w-full">
                <button
                    className="btn btn-primary mt-auto w-full"
                    onClick={() => handleViewDetails(course._id)}
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

export default CourseCard;
