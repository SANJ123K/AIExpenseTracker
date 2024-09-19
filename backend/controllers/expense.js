const ExpenseSchema = require("../models/ExpenseModel");

// Add expense
exports.addExpense = async (req, res) => {
    const {user, title, amount, date } = req.body;

    if (!user || !title ||  !date || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid data: All fields are required and amount must be positive!' });
    }

    try {
        const expense = new ExpenseSchema({ 
            user,
            title,
            amount,
            date
        });
        
        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Retrieve expense data
exports.getExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const expenses = await ExpenseSchema.find({user:id}).sort({date:-1});
        res.status(200).json(expenses);
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        await ExpenseSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update expense
exports.updateExpense = async (req, res) => {
    try {
        const expense = await ExpenseSchema.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

// get income by month
exports.getExpenseByDate = async (req, res) =>{
    try {
        const {startDate, endDate} = req.body;
        const dateWiseExpense = await ExpenseSchema.find({
            date:{
                $gte:startDate,
                $lte:endDate
            }})
        res.status(200).json(dateWiseExpense);
    } catch (error) {
       res.status(500).json({message:`Get some error in fetching data:${error}`});
    }
}