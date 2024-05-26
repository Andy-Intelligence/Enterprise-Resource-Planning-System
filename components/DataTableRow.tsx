"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const DataTableRow = ({ data, onEdit, onDelete }: any) => {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");

  const handleCellClick = (fieldName: string) => {
    setEditingCell(fieldName);
    setEditedValue(data[fieldName]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const handleInputBlur = () => {
    setEditingCell(null);
    // Here you can call a function to update the data in your parent component
    // For example:
    // updateData(data.id, editingCell, editedValue);
  };

  return (
    <tr>
      {Object.keys(data).map((key) => (
        <td
          key={key}
          className="border border-gray-200 px-4 py-2"
          onClick={() => handleCellClick(key)}
        >
          {editingCell === key ? (
            <input
              type="text"
              value={editedValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            data[key]
          )}
        </td>
      ))}
      <td className="border border-gray-200 px-4 py-2" onClick={onDelete}>
        <MdDelete size={30} />
      </td>
    </tr>
  );
};

export default DataTableRow;
