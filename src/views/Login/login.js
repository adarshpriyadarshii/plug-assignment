import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,signInWithGoogle,signin } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
function Login() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login_container">
      <h1>Hello! Login to continue.</h1>
        <button
          className="login_btn"
          onClick={signin}
        >
          Login Anonmously
        </button>
        <button className="login_btn login_google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
export default Login;