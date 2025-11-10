import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course.");
      return;
    }
    try{
      const res = await fetch("http://localhost:5000/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          userEmail: user.email,
          courseTitle: course.title
        }),
      });
      const data = await res.json();
      if(data.success){
      toast.success("Successfully enrolled in the course!");}
      else{
        toast.error(data.message || "Enrollment failed.");
      }
    } catch (error) {
      toast.error("Failed to enroll in the course.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course details");
        return res.json();
      })
      .then((data) => {
        setCourse(data);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-lg shadow-lg border overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-500 mb-4">By {course.instructor}</p>

          <p className="text-gray-700 mb-4 leading-relaxed">
            {course.long_description || course.short_description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-blue-600">
              ${course.price}
            </span>
            <span className="text-yellow-500 font-medium">
              ⭐ {course.rating}
            </span>
          </div>

          <div className="flex gap-4 mt-4 w-full">
            <button onClick={handleEnroll} className="btn btn-primary w-2/3">Enroll Now</button>
            <Link to="/courses" className="btn btn-outline w-1/3">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
