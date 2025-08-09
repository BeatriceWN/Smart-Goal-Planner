import React, { useState, useEffect } from "react";

export default function DepositForm({ goals = [], onDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (goals.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goals[0].id);
    }
  }, [goals, selectedGoalId]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedGoalId) {
      setError("Please select a goal.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a positive deposit amount.");
      return;
    }

    onDeposit(selectedGoalId, Number(amount));
    setAmount("");
  }

  if (goals.length === 0) return <p>No goals available to deposit into.</p>;

  return (
    <section>
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>
            Select Goal:
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              required
            >
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Deposit Amount (Ksh):
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Deposit</button>
      </form>
    </section>
  );
}
