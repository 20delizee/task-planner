import React, { useState, useEffect } from "react";
import TaskModal from "../pages/TaskModal";

type Task = {
  name: string;
  description: string;
  start: string;
  end: string;
  type: "frontend" | "backend";
};

const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return [...Array(days)].map((_, i) => new Date(year, month, i + 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <button onClick={handlePrevMonth}>⬅️</button>
        <h2>{currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" })}</h2>
        <button onClick={handleNextMonth}>➡️</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5em", marginTop: "1em" }}>
        {getMonthDays().map((date) => {
          const dateStr = formatDate(date);
          const dayTasks = tasks.filter(t => t.start <= dateStr && t.end >= dateStr);

          return (
            <div key={dateStr} style={{ background: "#fff", padding: "0.5em", border: "1px solid #ccc" }}>
              <strong>{date.getDate()}</strong>
              {dayTasks.map((task, i) => (
                <div
                  key={i}
                  className={`task-bar ${task.type === "frontend" ? "task-frontend" : "task-backend"}`}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
};

export default CalendarPage;
