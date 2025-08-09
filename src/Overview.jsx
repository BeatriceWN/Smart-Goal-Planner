import React from "react";

function daysLeft(deadline) {
  const today = new Date();
  const end = new Date(deadline);
  return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
}

function getDeadlineStatus(deadline, saved, target) {
  const days = daysLeft(deadline);
  if (saved >= target) return "Completed";
  if (days < 0) return "Overdue";
  if (days <= 30) return "Warning";
  return "On Track";
}

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  const warnings = goals.filter(
    (g) => getDeadlineStatus(g.deadline, g.savedAmount, g.targetAmount) === "Warning"
  );
  const overdue = goals.filter(
    (g) => getDeadlineStatus(g.deadline, g.savedAmount, g.targetAmount) === "Overdue"
  );

  return (
    <section className="overview">
      <h2>Goals Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: Ksh {totalSaved.toLocaleString()}</p>
      <p>Completed Goals: {completedGoals}</p>

      {warnings.length > 0 && (
        <div className="overview-warning">
          <h3>⚠️ Goals nearing deadline:</h3>
          <ul>
            {warnings.map((g) => (
              <li key={g.id}>
                {g.name} — Deadline in {daysLeft(g.deadline)} days
              </li>
            ))}
          </ul>
        </div>
      )}

      {overdue.length > 0 && (
        <div className="overview-overdue">
          <h3>Overdue Goals:</h3>
          <ul>
            {overdue.map((g) => (
              <li key={g.id}>
                {g.name} — Deadline passed on {g.deadline}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
