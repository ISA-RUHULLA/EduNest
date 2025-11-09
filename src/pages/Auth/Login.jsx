import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Step 1: Firebase authentication
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      // 🔹 Step 2: Fetch user data from backend
      const res = await fetch(`http://localhost:5000/users/${user.uid}`);
      if (!res.ok) throw new Error("Failed to fetch user role");

      const userData = await res.json();
      console.log("Fetched user data:", userData);

      if (userData?.email && userData?.role) {
        alert(`Welcome back, ${userData.role}!`);

        // 🔹 Step 3: Navigate based on role
        if (userData.role === "student") {
          navigate("/dashboard/student/dashboard", { replace: true });
        } else if (userData.role === "teacher") {
          navigate("/dashboard/teacher/home", { replace: true });
        } else {
          navigate("/", { replace: true }); // fallback
        }
      } else {
        alert("User not found in database!");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col justify-center items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Login to your account</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset space-y-4">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full text-base"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="label font-medium">Password</label>
              <input
                type="password"
                className="input input-bordered w-full text-base"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-neutral w-full mt-4 text-base"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
