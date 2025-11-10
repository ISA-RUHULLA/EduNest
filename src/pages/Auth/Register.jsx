import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { registerUser, auth } = useAuth(); // auth object needed for Google sign-in
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Password Validation
    const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;
    if (!uppercaseReg.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }
    if (!lowercaseReg.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Firebase auth registration
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      // 2️⃣ Update Firebase profile with name and photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // 3️⃣ Save user info to backend
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
          photoURL: photoURL,
        }),
      });

      toast.success("🎉 Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user info to backend if not already exists
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      toast.success("✅ Google Sign-In successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error("Google Sign-In failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="hero-content flex-col justify-center items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Register now!</h1>
        </div>

        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
          <div className="card-body">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label font-medium">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Photo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Paste your profile photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>

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

              <button
                type="submit"
                disabled={loading}
                className="btn btn-neutral w-full mt-4"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
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

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
