import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { loginUser, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      const res = await fetch(`http://localhost:5000/users/${user.uid}`);
      const data = await res.json();

      if (!res.ok || !data?.email) {
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            displayName: user.displayName || "New User",
            email: user.email,
            photoURL: user.photoURL || "",
          }),
        });
      }

      toast.success(`Welcome back, ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch(`http://localhost:5000/users/${user.uid}`);
      const data = await res.json();

      if (!res.ok || !data?.email) {
        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL || "",
          }),
        });
      }

      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} /> {/* 🔹 add toaster */}
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
              <p className="text-right text-sm text-blue-600 cursor-pointer">
                Forget Password?
              </p>

              <button type="submit" className="btn btn-neutral w-full mt-4">
                Login
              </button>
            </form>

            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
