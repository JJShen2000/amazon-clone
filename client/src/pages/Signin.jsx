import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { AuthContainer, AuthForm } from "../components";

const Signin = () => {
  const [isEmailStep, setIsEmailStep] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const field_email = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
  ];
  const field_password = [
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    setIsEmailStep(false);
  };

  return (
    <div className="signin">
      <AuthContainer>
        <h1>Sign in</h1>
        {isEmailStep ? (
          <div>
            <AuthForm
              onSubmit={handleEmailSubmit}
              buttonText="Continue"
              fields={field_email}
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
                href="#"
                onClick={() => {
                  setIsEmailStep(true);
                  setEmail("");
                }}
              >
                Change
              </a>
            </p>
            <AuthForm buttonText="Sign in" fields={field_password} />
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
