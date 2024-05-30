"use client";
import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';



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
  const router = useRouter();
  async function handleOnSubmit(event: FormEvent) {
    let route = "";
    if (formType === "login") {
      route = "/api/login";
    } else {
      route = "/api/register";
    }
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const resp = await fetch(route, {
      method: "POST",
      body: formData
    })
    const result = await resp.json();
    if (resp.ok) {
      if (formType === "login") {
        router.push("/dashboard");
      }
      else {
        alert('User created. Proceed to log in');  // Login after registration
        toggleForm();
      }
    }
    else {
      alert(result.message);
    }
    // The login form does not reditect the user to the dashboard if they try
    // to login in again immediately after loggin out. Refreshing the login page
    // makes the redirect work.
    router.refresh();
  }


  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="input-group">
          <label htmlFor={`${formType}-email`}>Email</label>
          <input name="email" type="email" id={`${formType}-email`} required />
        </div>
        <div className="input-group">
          <label htmlFor={`${formType}-password`}>Password</label>
          <input name="password" type="password" id={`${formType}-password`} required />
        </div>
        {formType === 'register' && (
          <div className="input-group">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input name="password" type="password" id="register-confirm-password" required />
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
