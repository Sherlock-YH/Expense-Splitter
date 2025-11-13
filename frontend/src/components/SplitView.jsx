import { useState } from "react";
import { splitExpense } from "../services/expenseService";

export default function SplitView() {
  const [groupId, setGroupId] = useState("");
  const [people, setPeople] = useState("");
  const [result, setResult] = useState(null);

  const handleSplit = async () => {
    if (!groupId || !people) return;
    const res = await splitExpense(groupId, people);
    setResult(res.data);
  };

  return (
    <div className="split-view">
      <input placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
      <input placeholder="Number of People" type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
      <button onClick={handleSplit}>Calculate Split</button>
      {result !== null && <p>Each person pays: ${result.toFixed(2)}</p>}
    </div>
  );
}
