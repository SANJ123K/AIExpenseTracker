import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/globalContext';

function AddIncome() {
  const {addIncome, error, setError} = useGlobalContext()
  const [inputState, setInputState] = useState({
      title: '',
      amount: '',
      date: '',

  })



  const { title, amount, date } = inputState;

  const handleInput = name => e => {
      setInputState({...inputState, [name]: e.target.value})
      setError('')
  }
 
  const handleSubmit = e => {
      e.preventDefault()
      addIncome(inputState)
      
      setInputState({
          title: '',
          amount: '',
          date: ''
      })
  }

  return (
    <StyledFormContainer>
      {error && <p className='error'>{error}</p>}
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name={'title'}
            value={title}
            onChange={handleInput('title')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            
            name={"amount"}
            value={amount}
            onChange={handleInput('amount')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name={"date"}
            value={date}
            onChange={handleInput('date')}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </StyledFormContainer>
  );
}

const StyledFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
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
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  button {
    padding: 10px;
    background-color: #232f3e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #1b242d;
    }
  }
`;

export default AddIncome;
