import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { getEvents, addEvent } from "./api";
import "./Calendar.css";

function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchEvents = async () => {
        const eventsData = await getEvents(token); 
        console.log(eventsData); 
        setEvents(eventsData);
        setLoading(false);
      };
  
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = async () => {
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        description: eventDescription,
        start_time: date.toISOString(),
        end_time: date.toISOString(),
      };

      if (token) {
        const eventData = await addEvent(newEvent, token); 
        setEvents([...events, eventData]);
        setEventTitle('');
        setEventDescription('');
      } else {
        alert("Musisz być zalogowany, aby dodać wydarzenie");
      }
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));

  };

  return (
    <div className="calendar-container">
      <h2>Wydarzenia na {date.toLocaleDateString()}</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="react-calendar"
      />
      <div className="event-form">
        <input
          type="text"
          placeholder="Tytuł wydarzenia"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="event-input"
        />
        <textarea
          placeholder="Opis wydarzenia"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="event-textarea"
        />
        <button onClick={handleAddEvent} className="event-btn">Dodaj wydarzenie</button>
      </div>

      <div className="event-list">
        {loading ? (
          <p>Ładowanie wydarzeń...</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.start_time).toLocaleString()}</p>
              <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">Usuń</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarComponent;