import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const IncomeBarChart = ({dateWiseIncomes = [],bgColor, textColor, maxWidth }) => {
  const labels = dateWiseIncomes.length ? dateWiseIncomes.map((income) => income.title) : [];
  const amounts = dateWiseIncomes ? dateWiseIncomes.map((income) => income.amount) : [];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income Amount',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartWrapper bgColor={bgColor} textColor={textColor} maxWidth={maxWidth}>
      <h1>Transaction Overview</h1>
      <Bar data={data} options={options} />
    </ChartWrapper>
  );
};


const ChartWrapper = styled.div`
  width: 80%;
  max-width: ${({ maxWidth }) => maxWidth || '1000px'};
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || '#f5f5f5'};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
    width: 95%;
  }

  h1 {
    color: ${({ textColor }) => textColor || '#333'};
    font-size: 2rem;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  canvas {
    max-height: 400px;
    width: 100%;
  }
`;

export default IncomeBarChart;
