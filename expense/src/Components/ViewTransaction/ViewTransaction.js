import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import IncomeBarChart from '../Chart/BarShow';
import IncomeHistoryByDate from './History';
import  IncomePieChart from '../Chart/PieChart'
function ViewTransaction() {
  const { dateWiseIncomes = [], getIncomeByDate, getExpenseByDate, dateWiseExpenses } = useGlobalContext();
  const [showIncome, setShowIncome] = useState(true);
  const [searchDate, setSearchDate] = useState('');

  const handleToggle = (isIncome) => {
    setShowIncome(isIncome);
  };

  const fetchTransactionData = (startDate, endDate) => {
    const dateObject = { startDate, endDate };
    showIncome ? getIncomeByDate(dateObject) : getExpenseByDate(dateObject);
  };

  const handleSearchButton = () => {
    if (!searchDate) return;
    fetchTransactionData(searchDate, searchDate);
  };

  const handleTodayDate = () => {
    const today = new Date();
    fetchTransactionData(today.setHours(0, 0, 0, 0), today.setHours(23, 59, 59, 999));
  };

  const handleWeekDate = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
    fetchTransactionData(startOfWeek, endOfWeek);
  };

  const handleMonthDate = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    fetchTransactionData(startOfMonth, endOfMonth);
  };

  const handleYearDate = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    fetchTransactionData(startOfYear, endOfYear);
  };

  return (
    <TransactionsStyled>
      <div className="select-date">
        <div className="duration">
          <button className="button-73" onClick={handleTodayDate}>Today</button>
          <button className="button-73" onClick={handleWeekDate}>Week</button>
          <button className="button-73" onClick={handleMonthDate}>Month</button>
          <button className="button-73" onClick={handleYearDate}>Year</button>
        </div>
        <div>
          <input
            type="search"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
          <button className="button-73 search-button" onClick={handleSearchButton}>
            Search
          </button>
        </div>
      </div>

      <div className="toggle">
        <button
          className={`button-92 ${showIncome ? 'active' : ''}`}
          onClick={() => handleToggle(true)}
        >
          SHOW INCOME
        </button>
        <button
          className={`button-92 ${!showIncome ? 'active' : ''}`}
          onClick={() => handleToggle(false)}
        >
          SHOW EXPENSE
        </button>
      </div>

      <div className="graph-history">
        <IncomeHistoryByDate dateWiseIncomes={showIncome ? dateWiseIncomes : dateWiseExpenses} />
        <IncomePieChart dateWiseIncomes={showIncome ? dateWiseIncomes : dateWiseExpenses} />
      </div>
    </TransactionsStyled>
  );
}


const TransactionsStyled = styled.div`
  height: 800px;

  .select-date {
    width: 100vw;
    display: flex;
    padding: 40px;
    justify-content: space-around;

    .duration {
      width: 280px;
      height: 50px;
      display: flex;
      justify-content: space-around;
    }

    .button-73 {
      appearance: none;
      background-color: #ffffff;
      border-radius: 40em;
      border-style: none;
      box-shadow: #adcfff 0 -12px 6px inset;
      box-sizing: border-box;
      color: #000000;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system, sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
      outline: none;
      padding: 1rem 1.3rem;
      transition: all 0.15s;
      user-select: none;
    }

    .button-73:hover {
      background-color: #ffc229;
      box-shadow: #ff6314 0 -6px 8px inset;
      transform: scale(1.125);
    }

    .button-73:active {
      transform: scale(1.025);
    }

    .search-button {
      background-color: #3498db; /* Custom color for the search button */
      color: white;
      width: 120px; /* Custom width */
      height: 45px; /* Custom height */
      margin-left: 20px; /* Add some margin for spacing */
    }

    .search-button:hover {
      background-color: #2980b9; /* Darker shade on hover */
    }

    input {
      height: 38px;
      width: 200px;
      font-size: 20px;
      border-radius: 20px;
    }
  }

  .toggle {
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button-92 {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 0.5em 1em;
    margin: 0 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: gray;
    color: black;
  }

  .button-92.active {
    background-color: green;
    color: white;
  }

  .button-92:hover {
    background-color: #a5d6a7;
    color: white;
  }

  .graph-history {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
  }

  /* Style for individual graph/history sections */
  .graph-history > div {
    flex: 1;
    margin: 0 10px;
  }

  /* Make it responsive */
  @media (max-width: 768px) {
    .graph-history {
      flex-direction: column;
      align-items: center;
    }

    .graph-history > div {
      width: 100%;
      margin: 10px 0;
    }
  }
`;


export default ViewTransaction;
