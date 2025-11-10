import React, { useEffect, useState } from "react";

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
                            name: name,
                            totalRating: 0,
                            courseCount: 0,
                            thumbnail: course.thumbnail // প্রথম কোর্সের ছবি রাখছি
                        };
                    }

                    instructorMap[name].totalRating += course.rating;
                    instructorMap[name].courseCount += 1;
                });

                
                const calculated = Object.values(instructorMap).map((inst) => ({
                    name: inst.name,
                    avgRating: (inst.totalRating / inst.courseCount).toFixed(2),
                    courseCount: inst.courseCount,
                    thumbnail: inst.thumbnail
                }));

                
                const sorted = calculated.sort((a, b) => b.avgRating - a.avgRating);

                
                setInstructors(sorted.slice(0, 3));
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top Instructors</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                {instructors.map((inst, i) => (
                    <div
                        key={i}
                        className="bg-blue-900 border rounded-xl shadow-lg p-4 text-center hover:shadow-2xl transition"
                    >
                        <img
                            src={inst.thumbnail}
                            alt={inst.name}
                            className="w-64 h-64 object-cover rounded-2xl mx-auto mb-3"
                        />
                        <h3 className="text-lg font-bold text-white">{inst.name}</h3>
                        <p className="text-gray-500 text-sm">{inst.courseCount} Courses</p>
                        <p className="mt-2 font-bold text-yellow-500">⭐ {inst.avgRating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopInstructors;
