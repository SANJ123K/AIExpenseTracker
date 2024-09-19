import React from 'react';
import TopPage1 from '../Page1/TopPage1';
import AddExpense from './AddExpense';
import ExpenseHistory from './ExpenseHistory';
import styled from 'styled-components';

function FinalPage2() {
  return (
    <StyledFinalPage>
      <div className='middle'>
        <AddExpense />
        <ExpenseHistory/>
      </div>
    </StyledFinalPage>
  );
}

const StyledFinalPage = styled.div`
  .middle {
    display: flex;
/* Change this to row if you want them side by side */
    gap: 20px; /* Adds space between AddIncome and IncomeHistory */
    padding: 20px; /* Optional padding */
  }
`;

export default FinalPage2;
