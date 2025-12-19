import React, { useState, useEffect } from "react";
import "./EquipmentForm.css";

export default function EquipmentForm({ onSubmit, selected, clearSelection }) {
  const [form, setForm] = useState({
    name: "",
    type: "Machine",
    status: "Active",
    lastCleaned: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.lastCleaned) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit(form);
    setForm({ name: "", type: "Machine", status: "Active", lastCleaned: "" });
    clearSelection();
  };

  return ( <form className="equipment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>
      <input
        type="date"
        name="lastCleaned"
        value={form.lastCleaned}
        onChange={handleChange}
      />
      <button type="submit">{selected ? "Update" : "Add"} Equipment</button>
    </form>
  );
}
