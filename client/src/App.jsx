import React, { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

function App() {
  const [page, setPage] = useState("signin"); // "signin", "signup", "home"
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (fullname) => {
    setUser({ fullname });
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
      {page === "signin" && (
        <SignIn
          onSwitchToSignUp={() => setPage("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {page === "signup" && (
        <SignUp onSwitchToSignIn={() => setPage("signin")} />
      )}
      {page === "home" && <Home fullname={user.fullname} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
