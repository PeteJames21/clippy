// src/Log.tsx
import React from 'react';



interface AuthFormProps {
  formType: 'login' | 'register';
  toggleForm: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
  switchText: string;
  switchLinkText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  toggleForm,
  title,
  subtitle,
  buttonText,
  switchText,
  switchLinkText,
}) => {
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form>
        <div className="input-group">
          <label htmlFor={`${formType}-email`}>Email</label>
          <input type="email" id={`${formType}-email`} required />
        </div>
        <div className="input-group">
          <label htmlFor={`${formType}-password`}>Password</label>
          <input type="password" id={`${formType}-password`} required />
        </div>
        {formType === 'register' && (
          <div className="input-group">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input type="password" id="register-confirm-password" required />
          </div>
        )}
        <button type="submit" className="btn">{buttonText}</button>
        <p className="switch-form">
          {switchText} <a href="#" onClick={toggleForm}>{switchLinkText}</a>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
