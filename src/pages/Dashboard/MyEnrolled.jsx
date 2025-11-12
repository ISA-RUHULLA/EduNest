import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const MyEnrolledCourses = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrolled = async () => {
    try {
      const res = await fetch(`https://edu-nest-server-lake.vercel.app/enroll/${user.email}`);
      const data = await res.json();
      setEnrolledCourses(data);
    } catch (err) {
      toast.error("Failed to fetch enrolled courses");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchEnrolled();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to unenroll?")) return;

    try {
      const res = await fetch(`https://edu-nest-server-lake.vercel.app/enroll/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Unenrolled successfully");
        setEnrolledCourses(enrolledCourses.filter(c => c._id !== id));
      }
    } catch (err) {
      toast.error("Failed to unenroll");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
        {enrolledCourses.map(course => (
          <div key={course._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{course.courseTitle}</h3>
            <button
              className="btn btn-sm btn-error mt-2"
              onClick={() => handleDelete(course._id)}
            >
              Unenroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
