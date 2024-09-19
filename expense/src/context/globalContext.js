import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useMsal } from '@azure/msal-react';

const BASE_URL = "http://localhost:5000/api/v1/";

const instance = axios.create({
  baseURL: BASE_URL,
  proxy: {
    host: 'proxy-host',
    port: 3001, // Replace with your proxy port
  },
});

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [dateWiseIncomes, setDateWiseIncomes] = useState([]);
  const [dateWiseExpenses, setDateWiseExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {accounts } = useMsal();

  // Helper function to handle errors and set error messages
  const handleError = (err) => {
    setError(err.response ? err.response.data.message : accounts.length > 0 ? "Servier side error found": "Please, Login Your Account?" );
    console.error(err); // Enhanced error logging
  };


  // Add new income and fetch updated incomes
  const addIncome = async (income) => {
    setLoading(true);
    try {
      if (accounts.length > 0) {
        income['user'] = accounts[0].username;
        await instance.post(`${BASE_URL}add-income`, income);
        await getIncomes(); // Refresh incomes after adding        
      }
      else{
        setError("Please, Login!")
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch incomes from the server
  const getIncomes = async () => {
    try {
       if(accounts.length >0)
       {
        const id = accounts[0].username;
        const response = await instance.get(`${BASE_URL}get-incomes/${id}`);
        setIncomes(response.data); 
       }
      else{
        setError("please, Login!");
      }
    } catch (err) {
      handleError(err);
    }
  };

  // get incomes by specific date
  const getIncomeByDate = async (date) =>{
    try{
      if(date){        
      const response = await instance.post(`${BASE_URL}get-incomesBy-date`, date);
        setDateWiseIncomes(response.data);
      }
      else{
          setError('provide proper date formate');
      }

    }
    catch(error){

    }
  }

  // Delete income by ID and refresh income list
  const deleteIncome = async (id) => {
    try {
      setLoading(true);
      if(!id){
        setError("provide correct ID")
        return;
      }
      await instance.delete(`${BASE_URL}delete-income/${id}`);
      await getIncomes(); // Refresh incomes after deleting
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update income
  const updateIncome = async (income) => {
    try {
      if(!income._id || !income.title || !income.amount )
      {
        setError("Fill all required field");
        return;
      }
      const response = await instance.put(`${BASE_URL}update-income`, income);
      if (response.status === 200) {
        await getIncomes();
      } else {
        console.log("Server-side error");
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Calculate total income
  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  };

  // Add new expense and fetch updated expenses
  const addExpense = async (expense) => {
    setLoading(true);
    try {
        if (accounts.length > 0) {
          expense['user'] = accounts[0].username; 
          await instance.post(`${BASE_URL}add-expense/`, expense);
          await getExpenses(); // Refresh expenses after adding         
        }
        else{
          setError("Please, Login!")
        }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch expenses from the server
  const getExpenses = async () => {
    try {
      if(accounts.length >0){
        const email = accounts[0].username;
        const response = await instance.get(`${BASE_URL}get-expenses/${email}`);
        setExpenses(response.data);
      }
      else{
        setError("Please, Login!");
      }
    
    } catch (err) {
      handleError(err);
    }
  };

    // get incomes by specific date
    const getExpenseByDate = async (date) =>{
      try{
        if(date){          
        const response = await instance.post(`${BASE_URL}get-ExpenseBy-date`, date);
          setDateWiseExpenses(response.data);
        }
        else{
            setError('provide proper date formate');
        }
  
      }
      catch(error){
  
      }
    }


  // Delete expense by ID and refresh expense list
  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      await instance.delete(`${BASE_URL}delete-expense/${id}`);
      await getExpenses(); // Refresh expenses after deleting
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update expense
  const updateExpense = async (expense) => {
    try {
      if(!expense._id || !expense.title || !expense.amount){
        setError("Fill all required field");
        return ;
      }
      const response = await instance.put(`${BASE_URL}update-expense`, expense);
      if (response.status === 200) {
        await getExpenses();
      } else {
        console.log("Server-side error");
      }
    } catch (err) {
      handleError(err);
    }
  };

  // Calculate total expenses
  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  };

  
  // Calculate total balance (income - expenses)
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Transaction history (get latest 3 transactions)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  // Clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <GlobalContext.Provider
      value={{        
        addIncome,
        getIncomes,
        getIncomeByDate,
        dateWiseIncomes,
        updateIncome,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        getExpenseByDate,
        dateWiseExpenses,
        deleteExpense,
        updateExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
