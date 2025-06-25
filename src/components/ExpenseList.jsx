import React, { useState } from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [editId, setEditId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  const handleEditClick = (expense) => {
    setEditId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSaveClick = () => {
    onEdit(editId, editedExpense);
    setEditId(null);
  };

  return (
    <div className="list-group shadow-sm">
      {expenses.length === 0 && <p className="text-muted">No expenses added yet.</p>}

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {editId === expense.id ? (
            <>
              <div className="w-75">
                <input
                  className="form-control mb-1"
                  value={editedExpense.title}
                  onChange={(e) =>
                    setEditedExpense((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <input
                  className="form-control mb-1"
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) =>
                    setEditedExpense((prev) => ({
                      ...prev,
                      amount: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="btn-group">
                <button className="btn btn-success btn-sm" onClick={handleSaveClick}>
                  💾 Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                  ❌ Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h6 className="mb-1">{expense.title}</h6>
                <small className="text-muted">
                  {expense.category} | {new Date(expense.date).toLocaleDateString()}
                </small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold text-success">₹{expense.amount.toFixed(2)}</span>
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(expense)}>
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this expense?')) {
                      onDelete(expense.id);
                    }
                  }}
                >
                  🗑️
                </button>
              </div>
              
            </>
          )}
        </div>
      ))}
      
    </div>
    
  );
};

export default ExpenseList;
