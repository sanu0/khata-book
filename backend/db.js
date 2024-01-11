const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Test123@cluster0.4upqz2m.mongodb.net/khata-book');

const balanceSchema = mongoose.Schema({
  amount: Number
})

const expensesSchema = mongoose.Schema({
  amount: Number, 
  description: String,
  isRecieved: Boolean
})

const Balance = mongoose.model('balances', balanceSchema);
const Expenses = mongoose.model('expenses', expensesSchema);

module.exports = {
  Balance: Balance,
  Expenses: Expenses
}