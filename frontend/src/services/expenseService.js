const API_BASE = "http://localhost:8080/api/expenses"; // Spring Boot default port

// ✅ Add a new expense
export async function addExpense(expense) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to add expense");
    }
    return response.json();
  } catch (err) {
    console.error("Add expense error:", err);
    alert("Error connecting to backend: " + err.message);
  }
}

// ✅ Get expenses by group
export async function getExpensesByGroup(groupId) {
  const response = await fetch(`${API_BASE}?groupId=${groupId}`);
  if (!response.ok) throw new Error("Failed to fetch expenses");
  return response.json();
}

// ✅ Delete expense
export async function deleteExpense(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete expense");
}

// ✅ Get total amount for a group
export async function getTotalByGroup(groupId) {
  const response = await fetch(`${API_BASE}/total?groupId=${groupId}`);
  if (!response.ok) throw new Error("Failed to fetch total");
  return response.json();
}

// ✅ Split expense
export async function splitExpense(groupId, people) {
  const response = await fetch(`${API_BASE}/split?groupId=${groupId}&people=${people}`);
  if (!response.ok) throw new Error("Failed to split expense");
  return response.json();
}
