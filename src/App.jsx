import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import DepositForm from "./DepositForm";
import "./index.css";

const API_URL = "http://localhost:3000/goals";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch goals on mount
  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, []);

  // Add new goal
  async function handleAddGoal(goal) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      });
      const newGoal = await res.json();
      setGoals((prev) => [...prev, newGoal]);
    } catch (error) {
      console.error("Failed to add goal:", error);
    }
  }

  // Update goal
  async function handleUpdateGoal(id, updatedFields) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updatedGoal = await res.json();
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? updatedGoal : goal))
      );
    } catch (error) {
      console.error("Failed to update goal:", error);
    }
  }

  // Delete goal
  async function handleDeleteGoal(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  }

  // Make deposit (update savedAmount)
  async function handleDeposit(goalId, depositAmount) {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    const newSavedAmount = goal.savedAmount + depositAmount;

    try {
      const res = await fetch(`${API_URL}/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      const updatedGoal = await res.json();
      setGoals((prev) =>
        prev.map((g) => (g.id === goalId ? updatedGoal : g))
      );
    } catch (error) {
      console.error("Failed to deposit:", error);
    }
  }

  if (loading) return <div>Loading goals...</div>;

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>

      <Overview goals={goals} />

      <GoalForm onAddGoal={handleAddGoal} />

      <DepositForm goals={goals} onDeposit={handleDeposit} />

      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
}
