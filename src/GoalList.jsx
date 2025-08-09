import React from "react";
import GoalItem from "./GoalItem";

export default function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  if (goals.length === 0) return <p>No goals found.</p>;

  return (
    <section>
      <h2>Your Goals</h2>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </section>
  );
}
