import React from 'react';

const EquipmentTable = ({ data, setEditingItem, deleteItem }) => {
  return (
    <table border="1" cellPadding="10">
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
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
            <td>{item.lastCleaned}</td>
            <td>
              <button onClick={() => setEditingItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
