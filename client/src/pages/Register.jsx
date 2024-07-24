import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContainer, AuthForm } from "@/components";
import "./Register.css";
import { register } from "@/services/authService";

const Register = () => {
  const navigate = useNavigate();
  const redirectDelay = 5000; // in ms

  const fields = [
    {
      label: "Your name",
      type: "text",
      name: "username",
      placeholder: "First and last name",
      minLength: 1,
      maxLength: 50,
      alert: "Name must be between 1 and 50 characters.",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      minLength: 1,
      maxLength: 50,
      alert: "Email must be between 1 and 50 characters.",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "At least 6 characters",
      minLength: 6,
      maxLength: 50,
      alert: "Password must be between 6 and 50 characters.",
      warning: "Password must be between 6 and 50 characters.",
    },
    {
      label: "Re-enter password",
      type: "password",
      name: "confirmPassword",
      alert: "Passwords do not match.",
    },
  ];

  const handleSubmit = async (form) => {
    try {
      const response = await register(form);

      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        toast.success(data.message, { autoClose: { redirectDelay } });

        setTimeout(() => {
          navigate("/signin");
        }, redirectDelay);
      } else {
        const errorData = await response.data;
        toast.error(errorData.error, { autoClose: { redirectDelay } });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error during registration";
      toast.error(errorMessage, { autoClose: redirectDelay });
    }
  };

  return (
    <div className="register">
      <AuthContainer>
        <h1>Create account</h1>
        <AuthForm
          buttonText="Continue"
          fields={fields}
          handleSubmit={handleSubmit}
        />
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
