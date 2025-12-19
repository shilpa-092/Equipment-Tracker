import React, { useEffect, useState } from "react";
import EquipmentTable from "./components/EquipmentTable";
import EquipmentForm from "./components/EquipmentForm";
import "./App.css";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [selected, setSelected] = useState(null);

  const API_URL = "http://localhost:5000/api/equipment";

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEquipment(data);
    } catch (err) {
      console.error("Error fetching equipment:", err);
    }
  };

  const handleAddOrUpdate = async (item) => {
    try {
      if (item.id) {
        await fetch(`${API_URL}/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      fetchEquipment();
      setSelected(null);
    } catch (err) {
      console.error("Error adding/updating equipment:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEquipment();
    } catch (err) {
      console.error("Error deleting equipment:", err);
    }
  };

  const handleEdit = (item) => setSelected(item);
  const clearSelection = () => setSelected(null);

  return (
    <div className="App">
      <h1>Equipment Tracker</h1>
      <EquipmentForm onSubmit={handleAddOrUpdate} selected={selected} clearSelection={clearSelection} />
      <EquipmentTable data={equipment} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
