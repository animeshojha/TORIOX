import React from "react";
export default function Home({ fullname, onLogout }) {
  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md font-sans w-full text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome, {fullname}!</h1>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
