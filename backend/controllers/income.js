const IncomeSchema = require("../models/IncomeModel");

// Add income
exports.addIncome = async (req, res) => {
    const {user, title, amount, date } = req.body;
    if (!user || !title || !date || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid data: All fields are required, and amount must be positive!' });
    }

    try {
        const income = new IncomeSchema({
            user, 
            title, 
            amount, 
            date });
        console.log(income);
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get incomes
exports.getIncomes = async (req, res) => {
    try {
        const {id} = req.params;
        const incomes = await IncomeSchema.find({user:id}).sort({date:-1});
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete income
exports.deleteIncome = async (req, res) => {

    try {
        const { id } = req.params;
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error('Error deleting income:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update income
exports.updateIncome = async (req, res) => {
    try {
        const income = await IncomeSchema.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (error) {
        console.error('Error updating income:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// get income by month
exports.getIncomesByDate= async (req, res) =>{
    try {
        const {startDate, endDate} = req.body;
        const dateWiseIncome = await IncomeSchema.find({
            date:{
                $gte:startDate,
                $lte:endDate
            }})
        res.status(200).json(dateWiseIncome);
    } catch (error) {
       res.status(500).json({message:`Get some error in fetching data:${error}`});
    }
}