import React from 'react';
import AddIncome from './AddIncome';
import IncomeHistory from './AddIncomeHistory';
import styled from 'styled-components';

function FinalPage2() {
  return (
    <StyledFinalPage>
      <div className='middle'>
        <AddIncome />
        <IncomeHistory />
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
