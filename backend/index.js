const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
// mongoose.connect(
//     "mongodb+srv://sanu0:sanu0123@cluster0.l7xzq0z.mongodb.net/"
// )

const Balance = {
    balance : 12500
}

app.get('/balance', (req, res) => {
    //Give you the available balnce in your khata
    res.status(200).json({
        balance : Balance.balance
    })
})
app.put('/balance', (req, res) => {
    try{
        const balance = req.body.balance;
        Balance.balance = balance;
        res.status(200).json({
            msg : "Balance updated. Your current balance is : " + Balance.balance
        })

    }catch(e){
        console.log(e);
        res.json({
            msg : "Something wrong!"
        })
    }
    
})
app.post('/expense', (req, res) => {
    try{
        const balance = req.body.balance;
        Balance.balance += balance;
        res.status(200).json({
            msg : "Balance updated. Your current balance is : " + Balance.balance
        })

    }catch(e){
        console.log(e);
        res.json({
            msg : "Something wrong!"
        })
    }
})
app.get('/expense', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})