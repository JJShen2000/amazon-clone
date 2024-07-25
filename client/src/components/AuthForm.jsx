import React, { useState } from "react";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import classNames from "classnames";

import "./AuthForm.css";

const AuthForm = ({ buttonText, fields, handleSubmit }) => {
  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState(new Set());

  const passValidation = (field, value) => {
    if (value === "") return true;

    if (field.minLength && value.length < field.minLength) return false;
    if (field.maxLength && value.length > field.maxLength) return false;

    if (
      field.name === "confirmPassword" &&
      value !== inputs["password"] &&
      inputs["password"] !== ""
    )
      return false;

    if (
      field.name === "password" &&
      value !== "" &&
      inputs["confirmPassword"] &&
      inputs["confirmPassword"] !== "" &&
      value !== inputs["confirmPassword"]
    ) {
      setInputErrors((prevItems) => new Set(prevItems).add("confirmPassword"));
    }

    return true;
  };

  const handleChange = (event, field) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (passValidation(field, value)) {
      setInputErrors((prevItems) => {
        const newItems = new Set(prevItems);
        newItems.delete(name);
        return newItems;
      });
    } else {
      setInputErrors((prevItems) => new Set(prevItems).add(name));
    }
  };

  return (
    <form
      className="authForm"
      onSubmit={async (event) => {
        event.preventDefault();
        handleSubmit(inputs);
      }}
    >
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <input
            className={classNames("authForm__input", {
              error: inputErrors.has(field.name),
            })}
            type={field.type}
            name={field.name}
            value={inputs[field.name] || ""}
            placeholder={field.placeholder}
            onChange={(e) => handleChange(e, field)}
            required
          />
          {field.alert && inputErrors.has(field.name) ? (
            <div className="authForm__warning">
              <PriorityHighIcon style={{ width: "15px", height: "15px" }} />
              {field.alert}
            </div>
          ) : (
            field.warning && (
              <div className="authForm__alert">
                <PrivacyTipIcon style={{ width: "15px", height: "15px" }} />
                {field.warning}
              </div>
            )
          )}
        </div>
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
