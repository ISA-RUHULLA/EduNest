import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth"; // 🔹 to update Firebase profile

const Register = () => {
  const { registerUser, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
          photoURL: photoURL,
        }),
      });

      alert("🎉 Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
