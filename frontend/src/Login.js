import React, { useState } from "react";
import { login } from "./api";
import { useNavigate } from "react-router-dom"; 
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response.token) {
      localStorage.setItem("token", response.token);
      const loggedInUser = { email };  
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser); 
      alert("Zalogowano!");
      navigate("/"); 
    } else {
      alert("Błąd logowania");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Logowanie</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" className="form-btn">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;