import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJs, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {
    const { incomes, expenses, getExpenses, getIncomes } = useGlobalContext();
    const [incomeHidden, setIncomeHidden] = useState(false);
    const [expenseHidden, setExpenseHidden] = useState(false);

    useEffect(() => {
        getExpenses();
        getIncomes();
    }, [getExpenses, getIncomes]);

    // Toggle datasets on legend click
    const handleLegendClick = (event, legendItem) => {
        if (legendItem.text === 'Income') {
            setIncomeHidden((prev) => !prev);
        } else if (legendItem.text === 'Expenses') {
            setExpenseHidden((prev) => !prev);
        }
    };

    // Dynamically adjust the labels depending on which data is shown
    const labels = incomeHidden === false
        ? incomes.map((inc) => dateFormat(inc.date))
        : expenses.map((exp) => dateFormat(exp.date));

    const incomeData = incomes.map((income) => income.amount);
    const expenseData = expenses.map((expense) => expense.amount);

    // Data for the Bar Chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 100, // Increased bar size
                hidden: incomeHidden, // Control dataset visibility with hidden
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barThickness:100, // Increased bar size
                hidden: expenseHidden, // Control dataset visibility with hidden
            }    
        ]
    };

    // Chart options with custom legend onClick behavior
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Income vs Expenses Over Time',
                font: {
                    size: 18
                }
            },
            legend: {
                position: 'top',
                onClick: handleLegendClick, // Custom toggle logic
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                barPercentage: 0.8, // Controls width of individual bars
                categoryPercentage: 0.6, // Controls spacing between bars
            }
        }
    };

    return (
        <BarChartStyled>
            <Bar data={data} options={options} />
        </BarChartStyled>
    );
}

// Styled component for the chart container
const BarChartStyled = styled.div`
    width: 100%;
    max-width: 700px;
    background: #FFFFFF;
    border: 2px solid #F0F0F0;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border-radius: 20px;
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 1.5rem;
        max-width: 100%;
    }

    @media (max-width: 480px) {
        padding: 1rem;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    }
`;

export default BarChart;
