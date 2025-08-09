import React, { useState } from "react";

function daysLeft(deadline) {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
}

function getDeadlineStatus(deadline, saved, target) {
  const days = daysLeft(deadline);
  if (saved >= target) return "Completed";
  if (days < 0) return "Overdue";
  if (days <= 30) return "Warning";
  return "On Track";
}

function ProgressBar({ saved, target }) {
  const percent = Math.min((saved / target) * 100, 100);
  let colorClass = "progress-orange";
  if (percent === 100) colorClass = "progress-green";
  else if (percent > 50) colorClass = "progress-blue";

  return (
    <div className="progress-bar-container" aria-label={`Progress: ${percent.toFixed(0)}%`}>
      <div
        className={`progress-bar-fill ${colorClass}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function GoalItem({ goal, onUpdateGoal, onDeleteGoal }) {
  const { id, name, category, targetAmount, savedAmount, deadline } = goal;
  const status = getDeadlineStatus(deadline, savedAmount, targetAmount);
  const remaining = Math.max(targetAmount - savedAmount, 0);
  const isCompleted = status === "Completed";

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editTarget, setEditTarget] = useState(targetAmount);
  const [editCategory, setEditCategory] = useState(category);
  const [editDeadline, setEditDeadline] = useState(deadline);

  function handleSave() {
    if (!editName || !editTarget || !editDeadline) {
      alert("Please fill in all required fields");
      return;
    }
    onUpdateGoal(id, {
      name: editName,
      targetAmount: Number(editTarget),
      category: editCategory,
      deadline: editDeadline,
    });
    setIsEditing(false);
  }

  return (
    <div
      className={`goal-item ${
        status === "Overdue" ? "overdue" : status === "Warning" ? "warning" : ""
      }`}
      aria-label={`Goal: ${name}, category ${category}, saved ${savedAmount} of ${targetAmount}`}
    >
      {isEditing ? (
        <>
          <div className="form-group">
            <label>
              Name:
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Target Amount (Ksh):
              <input
                type="number"
                min="1"
                step="0.01"
                value={editTarget}
                onChange={(e) => setEditTarget(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Category:
              <input
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Deadline:
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="goal-item-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{name}</h3>
          <p>Category: {category}</p>
          <p>
            Saved: Ksh {savedAmount.toLocaleString()} / Ksh {targetAmount.toLocaleString()}
          </p>
          <ProgressBar saved={savedAmount} target={targetAmount} />
          <p>Remaining: Ksh {remaining.toLocaleString()}</p>
          <p>Deadline: {deadline} ({daysLeft(deadline)} days left)</p>

          {status === "Warning" && <p className="overview-warning"> Nearing Deadline!</p>}
          {status === "Overdue" && <p className="overview-overdue"> Overdue!</p>}
          {isCompleted && <p>Goal Completed!</p>}

          <div className="goal-item-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteGoal(id)} className="btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
