import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import CalendarComponent from "./Calendar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (loggedInUser && token) {
      setUser(JSON.parse(loggedInUser)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <h2>Kalendarz App</h2>
          <ul>
            <li><Link to="/">Kalendarz</Link></li>
            {!user ? (
              <>
                <li><Link to="/login">Logowanie</Link></li>
                <li><Link to="/register">Rejestracja</Link></li>
              </>
            ) : (
              <>
                <li><button onClick={handleLogout}>Wyloguj</button></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CalendarComponent />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;