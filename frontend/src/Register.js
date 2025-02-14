import React, { useState } from "react";
import { register } from "./api";
import { useNavigate } from "react-router-dom"; 
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    if (response.msg) {
      alert(response.msg);

      navigate("/login"); 
    } else {
      alert("Błąd rejestracji");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Rejestracja</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Imię"
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
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
        <button type="submit" className="form-btn">Zarejestruj</button>
      </form>
    </div>
  );
};

export default Register;