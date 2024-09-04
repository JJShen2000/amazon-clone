import React from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "@/services/authService";
import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signout();
    navigate("/");
  };

  return (
    <div className="account">
      <h1>Your Account</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Account;
