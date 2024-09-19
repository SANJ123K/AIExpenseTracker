import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/globalContext';

function TopPage1() {
  const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
  const [totals, setTotals] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, [getExpenses, getIncomes]);

  useEffect(() => {
    const fetchData = async () => {
      setTotals({
        balance: totalBalance(),
        income: totalIncome(),
        expense: totalExpenses(),
      });
    };

    fetchData();
  }, [totalBalance, totalIncome, totalExpenses]);

  return (
    <StyledTopPage>
      <div className='total-amount'>
        <h1>Account Balance</h1>
        <span className='amount-value'>
          {totals.balance >= 0 ? `₹ ${totals.balance}` : `- ₹ ${Math.abs(totals.balance)}`}
        </span>
      </div>
      <div className='expense-income-buttons'>
        <button className='expense-income income' style={{ backgroundColor: 'Green' }}>
          <span>Income</span>
          <span className='amount-value'>₹{totals.income}</span>
        </button>
        <button className='expense-income expense' style={{ backgroundColor: 'Red' }}>
          <span>Expense</span>
          <span className='amount-value'>₹{totals.expense}</span>
        </button>
      </div>
    </StyledTopPage>
  );
}

const StyledTopPage = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .total-amount {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;

    h1 {
      font-size: 28px;
      color: #333;
    }

    .amount-value {
      font-size: 40px;
      font-weight: bold;
      color: black;
      margin-top: 5px;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .expense-income-buttons {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
      align-items: center;
    }
  }

  .expense-income {
    color: white;
    border: none;
    border-radius: 15px;
    padding: 15px;
    height: 80px;
    width: 170px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    span {
      font-size: 18px;
    }

    .amount-value {
      font-size: 32px;
      margin-top: 5px;
    }

    @media (max-width: 768px) {
      width: 130px;
      height: 70px;
      padding: 10px;

      span {
        font-size: 16px;
      }

      .amount-value {
        font-size: 28px;
      }
    }

    @media (max-width: 480px) {
      width: 100%;
      height: auto;
      padding: 15px;
      
      .amount-value {
        font-size: 26px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 768px) {
    .total-amount h1 {
      font-size: 24px;
    }

    .amount-value {
      font-size: 30px;
    }
  }

  @media (max-width: 480px) {
    .total-amount h1 {
      font-size: 20px;
    }

    .amount-value {
      font-size: 26px;
    }
  }
`;

export default TopPage1;
