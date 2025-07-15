import React, { useState } from "react";

type Task = {
  name: string;
  description: string;
  start: string;
  end: string;
  type: "frontend" | "backend";
};

const AddTask: React.FC = () => {
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    start: "",
    end: "",
    type: "frontend",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    alert("Tâche ajoutée !");
    setTask({ name: "", description: "", start: "", end: "", type: "frontend" });
  };

  return (
    <div className="container">
      <h2>Ajouter une tâche</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom de la tâche</label>
        <input type="text" name="name" value={task.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={task.description} onChange={handleChange} required />

        <label>Date de début</label>
        <input type="date" name="start" value={task.start} onChange={handleChange} required />

        <label>Date de fin</label>
        <input type="date" name="end" value={task.end} onChange={handleChange} required />

        <label>Type</label>
        <select name="type" value={task.type} onChange={handleChange}>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddTask;
