import React, { useState, useEffect } from 'react';

const EquipmentForm = ({ addItem, editingItem, updateItem, setEditingItem }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Machine');
  const [status, setStatus] = useState('Active');
  const [lastCleaned, setLastCleaned] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setType(editingItem.type);
      setStatus(editingItem.status);
      setLastCleaned(editingItem.lastCleaned);
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name, type, status, lastCleaned };
    if (editingItem) {
      updateItem(editingItem.id, item);
      setEditingItem(null);
    } else {
      addItem(item);
    }
    setName('');
    setType('Machine');
    setStatus('Active');
    setLastCleaned('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>
      <input type="date" value={lastCleaned} onChange={e => setLastCleaned(e.target.value)} />
      <button type="submit">{editingItem ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default EquipmentForm;
