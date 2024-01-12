const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_CONNECT);

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