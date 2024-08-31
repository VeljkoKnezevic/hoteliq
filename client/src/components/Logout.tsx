import React from "react";
import { useAuth } from "./AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Logic

    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
