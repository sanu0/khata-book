const express = require('express');
const mongoose = require("mongoose");
const {Balance , Expenses } = require("./db");
const {updateBalance , addExpense} = require("./types");
const port = 3000;

const app = express();

app.use(express.json());


function validateInputUpdateBalance(obj){
    const updateBalanceSchema = updateBalance;
    const response = updateBalanceSchema.safeParse(obj);
    //console.log(response);
    if(response.success){
        return obj;
    }else{
        return false;
    }
}

function validateInputUpdateExpense(obj){
    const updateExpenseSchema = addExpense;
    const response = updateExpenseSchema.safeParse(obj);
    //console.log(response);
    if(response.success){
        return obj;
    }else{
        return false;
    }
}

app.get('/balance', async function (req, res) {
    //Give you the available balnce in your khata
    const response = await Balance.find({});

    res.status(200).json({
       amount: response[0].amount
    })
    
})

app.post('/balance', async (req, res) => {
    const amount = req.body.amount;
    if(!validateInputUpdateBalance(amount)){
        res.status(411).json({
            msg : "Input is invalid"
        })
    }else{
        try{
            await Balance.updateOne({
                //id : '65a02f8fbe25ed57a36551c7'
            },{
                amount : amount
            })
            res.status(200).json({
                msg : "Balance added"
            })

        }catch(e){
            console.log(e);
            res.json({
                msg : "Something wrong!"
            })
        }
    }
})
app.get('/expense', async (req, res) => {
    const response = await Expenses.find({});
    res.status(200).json({
        response
     })
})
app.post('/expense', async (req, res) => {
    const amount = req.body.price;
    const description = req.body.description;
    const isRecieved = req.body.isRecieved;

    if(!validateInputUpdateExpense({amount,description,isRecieved})){
        res.status(411).json({
            msg : "Input is invalid"
        })
    }else{
        try{
            const resp = await Expenses.create({
                amount,
                description,
                isRecieved
            })
            //console.log(resp.amount);
            if(isRecieved){
                await Balance.updateOne({},{
                    "$inc" : {amount : resp.amount}
                })
            }else{
                await Balance.updateOne({},{
                    "$inc" : {amount : -resp.amount}
                })
            }
            res.status(200).json({
                msg : "expenses added"
            })

        }catch(e){
            console.log(e);
        }
    }
    

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})