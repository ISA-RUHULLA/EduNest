import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course.");
      return;
    }
    try {
      const res = await fetch("https://edu-nest-server-lake.vercel.app/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          userEmail: user.email,
          courseTitle: course.title
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Successfully enrolled in the course!");
      }
      else {
        toast.error(data.message || "Enrollment failed.");
      }
    } catch (error) {
      toast.error("Failed to enroll in the course.");
    }
  };

  useEffect(() => {
    axios
    .get(`https://edu-nest-server-lake.vercel.app/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (!course) {
    return <div className="text-center py-10 text-red-500">Course not found.</div>;
  }

  return (
    <div className="bg-white p-6">
      <div className="rounded-lg flex lg:flex-row md:flex-row flex-col shadow-md bg-blue-500 overflow-hidden">
        <div className="p-4">
          <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-120 border rounded-2xl object-cover"
        />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-xl font-bold mb-4">By : {course.instructor}</p>

            <p className="text-gray-300 mb-4 leading-relaxed">
              {course.long_description || course.short_description}
            </p>
            <p className="font-bold">Category: {course.category}</p>
            <p>Duration: {course.duration}</p>
            <p>Lessons: {course.lessons}</p>
            <p>Reviews: {course.reviews}</p>
          </div>
          <div className="flex justify-between items-center ">
            <span className="text-xl font-bold text-white">Price: 
              ${course.price}
            </span>
            <span className="text-yellow-500 font-medium">
              ⭐ {course.rating}
            </span>
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <button onClick={handleEnroll} className="btn btn-primary w-2/3">Enroll Now</button>
            <Link to="/courses" className="btn btn-outline w-1/3">
              Back 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
