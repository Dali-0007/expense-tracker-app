import React, { useState } from 'react';

const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(expense.title);
  const [editAmount, setEditAmount] = useState(expense.amount);
  const [editDate, setEditDate] = useState(expense.date);
  const [editCategory, setEditCategory] = useState(expense.category);

  const handleUpdate = () => {
    onEdit(expense.id, {
      title: editTitle,
      amount: editAmount,
      date: editDate,
      category: editCategory,
    });
    setIsEditing(false);
  };

  return (
    <div className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
      {isEditing ? (
        <>
          <input
            className="form-control"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            className="form-control"
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
          <input
            className="form-control"
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <select
            className="form-select"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
          <button className="btn btn-success" onClick={handleUpdate}>
            ✅ Save
          </button>
        </>
      ) : (
        <>
          <div>
            <strong>{expense.title}</strong> <br />
            ₹{expense.amount} | {expense.category}
          </div>
          <div>
            {new Date(expense.date).toLocaleDateString()}
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(expense.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseItem;
