const zod = require('zod');

const updateBalance = zod.number();

const addExpense = zod.object({
  amount: zod.number(),
  description: zod.string(),
  isRecieved: zod.boolean()
})

module.exports = {
  updateBalance: updateBalance,
  addExpense: addExpense
}