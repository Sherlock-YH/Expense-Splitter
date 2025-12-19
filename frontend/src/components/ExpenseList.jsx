import { useState } from "react";
import { deleteExpense } from "../services/expenseService";

export default function ExpenseList({ expenses, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  async function handleDelete(id, description) {
    if (!confirm(`Are you sure you want to delete "${description}"?`)) {
      return;
    }

    setDeleting(id);
    setError("");

    try {
      await deleteExpense(id);
      onDelete();
    } catch (err) {
      setError(err.message || "Failed to delete expense");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <h2>Expenses</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "0.5rem", padding: "0.5rem", backgroundColor: "#fee", borderRadius: "4px" }}>
          {error}
        </div>
      )}
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {expenses.map((exp) => (
            <li key={exp.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{exp.description}</strong> — ${exp.amount} (by {exp.paidBy}){" "}
              <button 
                onClick={() => handleDelete(exp.id, exp.description)}
                disabled={deleting === exp.id}
              >
                {deleting === exp.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
