import React, { useState } from 'react';

const initialFormState = {
  title: '',
  amount: '',
  category: '',
  date: '',
};

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all fields!');
      return;
    }

    // Pass data to parent
    onAddExpense({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    });

    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success w-100">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
