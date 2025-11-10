import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyEnrolled = () => {
    const { user } = useAuth();
    const [enrolled, setEnrolled] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/enroll/${user.email}`)
            .then((res) => res.json())
            .then((data) => setEnrolled(data))
            .catch((err) => console.error(err));
    }, [user]);

    if (!enrolled.length)
        return <p className="text-center mt-10">You haven't enrolled in any courses yet.</p>;

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 p-6">
            {enrolled.map((course) => (
                <div
                    key={course._id}
                    className="bg-blue-400 shadow rounded-lg p-4 flex flex-col"
                >
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-500 text-sm">{course.instructor}</p>
                </div>
            ))}
        </div>
    );
};


export default MyEnrolled;