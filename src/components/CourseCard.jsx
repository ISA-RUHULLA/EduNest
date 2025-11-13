import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";
import axios from "axios";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://edu-nest-server-lake.vercel.app/courses")
      // .then((res) => res.json())
      .then((res) => {

        const topCourses = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setCourses(topCourses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error)
        setLoading(false);
      });

  }, []);

  const handleViewDetails = (id) => {
    navigate(`/course/${id}`);
  };
  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="p-6 my-4 rounded-lg dark:bg-gray-400 shadow">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center dark:text-white">
          Top Rated Courses
        </h2>
        <p className="text-base-content text-center mb-10">Explore our top-rated courses, carefully curated to help you achieve your  <br /> learning goals with expert instructors and comprehensive content.</p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.18,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            }}
            className="rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300  bg-blue-900 text-white flex flex-col text-center"
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

            <div className="flex justify-between mt-auto pt-4 gap-2 w-full">
              <button
                className="btn btn-primary w-full"
                onClick={() => handleViewDetails(course._id)}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
