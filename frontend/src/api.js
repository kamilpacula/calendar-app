const API_URL = "http://localhost:5000/api";



const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

const login = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

const getEvents = async (token) => {
  const res = await fetch(`${API_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, 
    },
  });
  const data = await res.json();
  if (Array.isArray(data)) {
    return data; 
  }
  return []; 
};

const addEvent = async (eventData, token) => {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, 
    },
    body: JSON.stringify(eventData), 
  });
  return res.json();
};

const deleteEvent = async (eventId, token) => {
  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,  
    },
  });
  return res.json();
};

module.exports = { register, login, getEvents, addEvent, deleteEvent };