import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/globalContext';


function AddExpense() {
  const {addExpense, error, setError} = useGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '', 
  });

  const { title, amount, date } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData); 
    setFormData({
      title: '',
      amount: '',
      date: '',
    }); // Reset form data after submission
  };

  return (
    <StyledForm>
      {error && <p className="error">{error}</p>}
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  width: 100%;
  max-width: 400px; /* Adjusted width */
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #232f3e;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    label {
      display: flex;
      flex-direction: column;
      text-align: left;

      input, select {
        margin-top: 5px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

    button {
      padding: 10px;
      background-color: #232f3e;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #1b242d;
      }
    }
  }
`;

export default AddExpense;
