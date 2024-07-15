import React from "react";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import "./AuthForm.css";

const AuthForm = ({ onSubmit, buttonText, fields }) => {
  return (
    <form className="authForm" onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            onChange={field.onChange}
            required
          />
          {field.alert && (
            <div className="authForm__alert">
              <PrivacyTipIcon style={{ width: "15px", height: "15px" }} />
              {field.alert}
            </div>
          )}
        </div>
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
