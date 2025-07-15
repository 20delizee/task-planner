import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddTask from "./pages/AddTask";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/add">Ajouter une tâche</Link>
        <Link to="/calendar">Calendrier</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddTask />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App;
