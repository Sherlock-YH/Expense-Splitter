import { useState } from "react";
import { addExpense } from "../services/expenseService";

export default function ExpenseForm({ groupId, onExpenseAdded }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description || !amount || !paidBy) return;

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
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Paid by"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
