const API_URL = "http://localhost:5000/api";


export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};


export const login = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};


export const getEvents = async (token) => {
  const res = await fetch(`${API_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, 
    },
  });
  return res.json();
};


export const addEvent = async (eventData, token) => {
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

export const deleteEvent = async (eventId, token) => {
  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,  
    },
  });
  return res.json();
};