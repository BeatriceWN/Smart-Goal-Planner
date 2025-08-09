import React, { useState } from "react";

const categories = [
  "Travel",
  "Emergency",
  "Electronics",
  "Real Estate",
  "Vehicle",
  "Education",
  "Shopping",
  "Retirement",
  "Home",
];

export default function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !targetAmount || !deadline) {
      alert("Please fill in all required fields.");
      return;
    }

    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddGoal(newGoal);

    // Reset form
    setName("");
    setTargetAmount("");
    setCategory(categories[0]);
    setDeadline("");
  }

  return (
    <section>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Goal Name:
            <input
              type="text"
              placeholder="e.g. Travel Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Target Amount ($):
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="e.g. 5000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Deadline:
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Add Goal</button>
      </form>
    </section>
  );
}
