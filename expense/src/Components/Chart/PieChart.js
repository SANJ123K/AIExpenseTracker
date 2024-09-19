import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomePieChart = ({ dateWiseIncomes = [], bgColor, textColor, maxWidth }) => {
  // Aggregate amounts by title
  const incomeByTitle = dateWiseIncomes.reduce((acc, income) => {
    if (acc[income.title]) {
      acc[income.title] += income.amount;
    } else {
      acc[income.title] = income.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(incomeByTitle);
  const amounts = Object.values(incomeByTitle);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income Amount',
        data: amounts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(201, 203, 207, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(54, 162, 235, 1)',
        ],
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
        text: 'Data Overview (Pie)',
      },
    },
  };

  return (
    <ChartWrapper bgColor={bgColor} textColor={textColor} maxWidth={maxWidth}>
      <h1>Data Overview</h1>
      <Pie data={data} options={options} />
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

export default IncomePieChart;
