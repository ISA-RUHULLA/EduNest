import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const { registerUser, loading,} = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Firebase auth registration
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      // 2️⃣ Save role to backend
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
        }),
      });

      alert("Registration successful!");
      // Optional: redirect to dashboard
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
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-6">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset space-y-4">
              <label className="label font-medium">Name</label>
              <input
                type="text"
                className="input input-bordered w-full text-base"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                disabled={loading}
                className="btn btn-neutral w-full mt-4 text-base"
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
