const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        trim:true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },

    date: {
        type:Date,
        default: Date.now,
    },
}, {timestamps: true})

module.exports = mongoose.model('UserIncome', IncomeSchema)