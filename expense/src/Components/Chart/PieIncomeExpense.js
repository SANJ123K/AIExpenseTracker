import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJs, 
    ArcElement, 
    Tooltip, 
    Legend
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieIncomeExpense() {
    const { incomes, expenses, getExpenses, getIncomes } = useGlobalContext();

    useEffect(() => {
        getExpenses();
        getIncomes();
    }, [getExpenses, getIncomes]);

    // Sum the income and expense amounts
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Data for the Pie Chart
    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [totalIncome, totalExpenses],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Options for the Pie Chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Income vs Expenses',
                font: {
                    size: 18,
                },
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <PieChartStyled>
            <Pie data={data} options={options} />
        </PieChartStyled>
    );
}

// Styled component for the Pie chart container
const PieChartStyled = styled.div`
    width: 100%;
    max-width: 500px;
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

export default PieIncomeExpense;
