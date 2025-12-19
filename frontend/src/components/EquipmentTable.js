import React from "react";
import "./EquipmentTable.css";

export default function EquipmentTable({ data, onEdit, onDelete }) {
  return (
    <table className="equipment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
            <td>{item.lastCleaned}</td>
            <td>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
