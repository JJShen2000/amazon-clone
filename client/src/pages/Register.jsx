import React from "react";
import { Link } from "react-router-dom";

import { AuthContainer, AuthForm } from "../components";
import "./Register.css";

const Register = () => {
  const fields = [
    {
      label: "Your name",
      type: "text",
      name: "username",
      placeholder: "First and last name",
      // value: username,
      // onChange: (e) => setUsername(e.target.value),
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      // value: email,
      // onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "At least 6 characters",
      alert: "Passwords must be at least 6 characters.",
      // value: password,
      // onChange: (e) => setPassword(e.target.value),
    },
    {
      label: "Re-enter password",
      type: "password",
      name: "confirmPassword",
      // value: confirmPassword,
      // onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];
  return (
    <div className="register">
      <AuthContainer>
        <h1>Create account</h1>
        <AuthForm buttonText="Continue" fields={fields} />
        <p className="authContainer__terms">
          By creating an account, you agree to Amazon-Clone's Conditions of Use
          and Privacy Notice.
        </p>
        <div className="register__divider"></div>
        <div className="register__text">
          <span>Already have an account? </span>
          <Link to="/signin" className="auth-link">
            Sign in →
          </Link>
        </div>
      </AuthContainer>
    </div>
  );
};

export default Register;
