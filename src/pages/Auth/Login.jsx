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
      // 🔹 Step 1: Firebase Authentication
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      // 🔹 Step 2: Check if user exists in backend DB
      const res = await fetch(`http://localhost:5000/users/${user.uid}`);
      const data = await res.json();

      if (res.ok && data?.email) {
        // 🔹 Step 3: Success message & redirect
        alert(`Welcome back, ${data.displayName || "User"}!`);
        navigate("/"); // redirect to homepage
      } else {
        // 🔹 Step 4: If not found, create user in backend
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            displayName: user.displayName || "New User",
            email: user.email,
          }),
        });

        alert("New account synced successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-neutral w-full mt-4">
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
