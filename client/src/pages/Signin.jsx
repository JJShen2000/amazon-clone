import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContainer, AuthForm } from "@/components";
import "./Signin.css";
import { signin } from "@/services/authService";

const Signin = () => {
  const [isEmailStep, setIsEmailStep] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const redirectDelay = 3000; // in ms

  const field_email = [
    {
      label: "Email",
      type: "email",
      name: "email",
      minLength: 1,
      maxLength: 50,
      alert: "Email must be between 1 and 50 characters.",
    },
  ];
  const field_password = [
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
  ];

  const handleEmailSubmit = async (form) => {
    try {
      const response = await signin(form);

      if (response.status >= 200 && response.status < 300) {
        setEmail(form.email);
        setIsEmailStep(false);
      } else {
        const errorData = await response.data;
        toast.error(errorData.error, { autoClose: { redirectDelay } });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during sign-in";
      toast.error(errorMessage, { autoClose: redirectDelay });
    }
  };

  const handlePasswordSubmit = async (form) => {
    try {
      form["email"] = email;
      const response = await signin(form);

      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        toast.success(data.message, { autoClose: { redirectDelay } });

        setTimeout(() => {
          navigate("/");
        }, redirectDelay);
      } else {
        const errorData = await response.data;
        toast.error(errorData.error, { autoClose: { redirectDelay } });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during sign-in";
      toast.error(errorMessage, { autoClose: redirectDelay });
    }
  };

  return (
    <div className="signin">
      <AuthContainer>
        <h1>Sign in</h1>
        {isEmailStep ? (
          <div>
            <AuthForm
              buttonText="Continue"
              fields={field_email}
              handleSubmit={handleEmailSubmit}
            />
            <p className="authContainer__terms">
              By continuing, you agree to Amazon-Clone's Conditions of Use and
              Privacy Notice.
            </p>
          </div>
        ) : (
          <div>
            <p>
              {email}{" "}
              <a
                href="#/"
                onClick={() => {
                  setIsEmailStep(true);
                  setEmail("");
                }}
              >
                Change
              </a>
            </p>
            <AuthForm
              buttonText="Sign in"
              fields={field_password}
              handleSubmit={handlePasswordSubmit}
            />
          </div>
        )}
      </AuthContainer>
      {isEmailStep && (
        <div>
          <div className="signin__divider">
            <span className="line"></span>
            <span className="text">New to Amazon?</span>
            <span className="line"></span>
          </div>
          <Link to={`/register`} style={{ textDecoration: "none" }}>
            <span className="signin__registerButton">
              Create your Amazon Account
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signin;
