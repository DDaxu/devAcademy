const express = require('express');
const router =  express.Router();
const fs = require('fs');
const nameList = fs.readFileSync('./names.json');
var list = JSON.parse(nameList);

//Order by amount
router.get('/byAmount', (req,res,next) =>{
    var nameAmount = list.names.sort((a,b) => b.amount - a.amount);
    res.status(200).json({
         nameAmount
    });
});

//Order by names
router.get('/byNames', (req,res,next) =>{
    var orderNames = list.names.sort((a, b) => a.name.localeCompare(b.name));
    res.status(200).json({
         orderNames
    });
});

//Get total amount of names
router.get('/totalAmount', (req,res,next) =>{
    var sum = 0;
    list.names.forEach(function(x){
    
       // console.log(x.amount);
        sum = sum + x.amount;
    });
    res.status(200).json({
        amount: sum
   });
});
//Get one amount of names
router.get('/:personAmount', (req,res,next) =>{
    var person = '';
    list.names.forEach(function(x){
        if(x.name === req.params.personAmount){
             person = x.amount;
        }
     });
     res.status(200).json({
        person: person
    });
});
module.exports = router;