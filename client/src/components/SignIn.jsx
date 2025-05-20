import React, { useState } from "react";
import axios from "axios";

export default function SignIn({ onSwitchToSignUp, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic front-end validation
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/signin", formData);
      onLoginSuccess(res.data.fullname); // pass fullname to parent to show on homepage
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md font-sans w-full">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Sign In
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          minLength={6}
          className="mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:underline focus:outline-none"
          type="button"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
