import React from "react";

type Task = {
  name: string;
  description: string;
};

type Props = {
  task: Task | null;
  onClose: () => void;
};

const TaskModal: React.FC<Props> = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        padding: "2em",
        borderRadius: "8px",
        width: "300px"
      }}>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <button onClick={onClose} style={{ marginTop: "1em" }}>Fermer</button>
      </div>
    </div>
  );
};

export default TaskModal;
