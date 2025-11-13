import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { getExpensesByGroup, getTotalByGroup, splitExpense } from "./services/expenseService";

function App() {
  const [groupId, setGroupId] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState(2);
  const [splitAmount, setSplitAmount] = useState(0);

  async function refreshData() {
    const data = await getExpensesByGroup(groupId);
    setExpenses(data);

    const totalAmount = await getTotalByGroup(groupId);
    setTotal(totalAmount);

    const split = await splitExpense(groupId, people);
    setSplitAmount(split);
  }

  useEffect(() => {
    refreshData();
  }, [groupId, people]);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>💰 Expense Splitter</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Group ID: </label>
        <input
          type="number"
          value={groupId}
          onChange={(e) => setGroupId(parseInt(e.target.value))}
        />
      </div>

      <ExpenseForm groupId={groupId} onExpenseAdded={refreshData} />

      <ExpenseList expenses={expenses} onDelete={refreshData} />

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <h3>Total: ${total.toFixed(2)}</h3>

        <div>
          <label>Number of People: </label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
          />
        </div>

        <h3>Each person owes: ${splitAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;
