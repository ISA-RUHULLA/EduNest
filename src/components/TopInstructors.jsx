import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const TopInstructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then((res) => res.json())
            .then((data) => {
                const instructorMap = {};

                data.forEach((course) => {
                    const name = course.instructor;
                    if (!instructorMap[name]) {
                        instructorMap[name] = {
                            name,
                            totalRating: 0,
                            courseCount: 0,
                            thumbnail: course.thumbnail,
                        };
                    }
                    instructorMap[name].totalRating += course.rating;
                    instructorMap[name].courseCount += 1;
                });

                const calculated = Object.values(instructorMap).map((inst) => ({
                    name: inst.name,
                    avgRating: (inst.totalRating / inst.courseCount).toFixed(2),
                    courseCount: inst.courseCount,
                    thumbnail: inst.thumbnail,
                }));

                const sorted = calculated.sort((a, b) => b.avgRating - a.avgRating);
                setInstructors(sorted.slice(0, 3));
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="p-6 my-4 bg-blue-800 rounded-lg">
            <div>
                <h2 className=" font-bold mt-10 text-3xl md:text-4xl text-center text-white">
                🏆 Top Instructors
            </h2>
            <p className="text-white text-center mb-10">Meet our top-rated instructors who are experts in their fields and passionate about teaching.</p>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {instructors.map((inst, i) => (
                    <AnimatedInstructorCard key={i} inst={inst} />
                ))}
            </div>
        </div>
    );
};

const AnimatedInstructorCard = ({ inst }) => {
    const controls = useAnimation();
    const [ref, setRef] = useState(null);

    useEffect(() => {
        if (!ref) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start({
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, ease: "easeOut" },
                        });
                    } else {
                       
                        controls.start({ opacity: 0, y: 100 });
                    }
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, controls]);

    return (
        <motion.div
            ref={setRef}
            initial={{ opacity: 0, y: 100 }}
            animate={controls}
            className="bg-blue-900 border rounded-xl shadow-lg p-4 text-center hover:shadow-2xl transition"
        >
            <img
                src={inst.thumbnail}
                alt={inst.name}
                className="w-64 h-64 object-cover rounded-2xl mx-auto mb-3"
            />
            <h3 className="text-lg font-bold text-white">{inst.name}</h3>
            <p className="text-gray-400 text-sm">{inst.courseCount} Courses</p>
            <p className="mt-2 font-bold text-yellow-500">⭐ {inst.avgRating}</p>
        </motion.div>
    );
};

export default TopInstructors;
