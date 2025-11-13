import { deleteExpense } from "../services/expenseService";

export default function ExpenseList({ expenses, onDelete }) {
  async function handleDelete(id) {
    await deleteExpense(id);
    onDelete();
  }

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {expenses.map((exp) => (
            <li key={exp.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{exp.description}</strong> — ${exp.amount} (by {exp.paidBy}){" "}
              <button onClick={() => handleDelete(exp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
