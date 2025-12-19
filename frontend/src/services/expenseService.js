const API_BASE = "http://localhost:8080/api/expenses";

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.description || errorData.amount || errorData.paidBy) {
        errorMessage = Object.values(errorData).join(", ");
      }
    } catch {
      errorMessage = await response.text() || `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export async function addExpense(expense) {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    return await handleResponse(response);
  } catch (err) {
    console.error("Add expense error:", err);
    throw err;
  }
}

export async function getExpensesByGroup(groupId) {
  try {
    const response = await fetch(`${API_BASE}?groupId=${groupId}`);
    return await handleResponse(response);
  } catch (err) {
    console.error("Fetch expenses error:", err);
    return [];
  }
}

export async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return await handleResponse(response);
  } catch (err) {
    console.error("Delete expense error:", err);
    throw err;
  }
}

export async function getTotalByGroup(groupId) {
  try {
    const response = await fetch(`${API_BASE}/total?groupId=${groupId}`);
    return await handleResponse(response);
  } catch (err) {
    console.error("Fetch total error:", err);
    return 0;
  }
}

export async function splitExpense(groupId, people) {
  try {
    const response = await fetch(`${API_BASE}/split?groupId=${groupId}&people=${people}`);
    return await handleResponse(response);
  } catch (err) {
    console.error("Split expense error:", err);
    return 0;
  }
}
