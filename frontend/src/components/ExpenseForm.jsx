import { useState } from "react";
import { addExpense } from "../services/expenseService";

export default function ExpenseForm({ groupId, onExpenseAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description || !amount || !paidBy) return;

    setLoading(true);
    setError("");

    try {
      await addExpense({
        description,
        amount: parseFloat(amount),
        paidBy,
        groupId,
      });

      setDescription("");
      setAmount("");
      setPaidBy("");
      onExpenseAdded();
    } catch (err) {
      setError(err.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <h2>Add Expense</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "0.5rem", padding: "0.5rem", backgroundColor: "#fee", borderRadius: "4px" }}>
          {error}
        </div>
      )}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Paid by"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
