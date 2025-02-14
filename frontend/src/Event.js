const handleSubmitEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ title, description, start_time, end_time }),
    });
    if (response.ok) {
      alert("Wydarzenie zostało dodane");
    } else {
      alert("Błąd dodawania wydarzenia");
    }
  };