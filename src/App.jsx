import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
const [sortOrder, setSortOrder] = useState('newest');


  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };
  const handleEditExpense = (id, updatedExpense) => {
  setExpenses((prev) =>
    prev.map((exp) => (exp.id === id ? { ...exp, ...updatedExpense } : exp))
  );
  
};
const filteredExpenses = expenses
  .filter((exp) =>
    filterCategory ? exp.category === filterCategory : true
  )
  .filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) =>
    sortOrder === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
const expenseCount = filteredExpenses.length;

  
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">💰 Expense Tracker</h2>

      <div className="row">
        <div className="col-md-6">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">🧾 Expense List</h5>
          <Filter
  selectedCategory={filterCategory}
  onCategoryChange={setFilterCategory}
/>
<div className="d-flex justify-content-between align-items-center mb-3 gap-3">
  <input
    type="text"
    placeholder="🔍 Search by Title"
    className="form-control"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    className="form-select"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    style={{ maxWidth: '200px' }}
  >
    <option value="newest">🕒 Newest First</option>
    <option value="oldest">📅 Oldest First</option>
  </select>
</div>
<div className="alert alert-info d-flex justify-content-between">
  <span><strong>Total Expenses:</strong> ₹{totalAmount.toFixed(2)}</span>
  <span><strong>Items:</strong> {expenseCount}</span>
</div>
          <ExpenseList 
             expenses={filteredExpenses} 
             onDelete={handleDeleteExpense}
             onEdit={handleEditExpense}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
