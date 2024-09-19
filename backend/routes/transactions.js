const { addExpense, getExpense, deleteExpense, updateExpense, getExpenseByDate } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome, getIncomesByDate } = require('../controllers/income');
const { saveNote } = require('../controllers/notesController');
const { checkToken } = require('../middleware/authMiddleware');


const router = require('express').Router();


router.post('/login', checkToken, saveNote)
    .post('/add-income', addIncome)
    .get('/get-incomes/:id', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income', updateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses/:id', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-expense', updateExpense)
    .post('/get-incomesBy-date', getIncomesByDate)
    .post('/get-expenseBy-date', getExpenseByDate)
    
module.exports = router