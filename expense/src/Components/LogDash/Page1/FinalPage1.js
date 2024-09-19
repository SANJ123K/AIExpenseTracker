import React from 'react';
import TopPage1 from './TopPage1';
import IncomeHistory from '../Page2/AddIncomeHistory';
import ExpenseHistory from '../Page3/ExpenseHistory';
import styled from 'styled-components';
import BarChart from '../../Chart/BarChart';
import PieIncomeExpense from '../../Chart/PieIncomeExpense';

function FinalPage() {
  return (
    <StyledFinalPage>
      <div className="chart">
        <BarChart />
        <PieIncomeExpense />
      </div>
      <div className="middle">
        <IncomeHistory />
        <ExpenseHistory />
      </div>
    </StyledFinalPage>
  );
}

const StyledFinalPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  /* Chart section */
  .chart {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
    }
  }

  /* Middle section for history */
  .middle {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    padding: 0 10px;

    .chart {
      flex-direction: column;
      align-items: center;
    }

    .middle {
      margin-top: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 5px;

    .chart {
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }

    .middle {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default FinalPage;
