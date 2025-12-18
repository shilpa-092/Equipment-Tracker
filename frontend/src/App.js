import React, { useState, useEffect } from 'react';
import EquipmentTable from './components/EquipmentTable';
import EquipmentForm from './components/EquipmentForm';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/api/equipment');
    const data = await res.json();
    setEquipment(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async (item) => {
    const res = await fetch('http://localhost:5000/api/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const newItem = await res.json();
    setEquipment([...equipment, newItem]);
  };

  const updateItem = async (id, updatedItem) => {
    const res = await fetch(`http://localhost:5000/api/equipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });
    const newItem = await res.json();
    setEquipment(equipment.map(e => e.id === id ? newItem : e));
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/equipment/${id}`, { method: 'DELETE' });
    setEquipment(equipment.filter(e => e.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Equipment Tracker</h1>
      <EquipmentForm addItem={addItem} editingItem={editingItem} updateItem={updateItem} setEditingItem={setEditingItem} />
      <EquipmentTable data={equipment} setEditingItem={setEditingItem} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
