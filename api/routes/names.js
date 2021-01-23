const express = require("express");
const router = express.Router();
const fs = require("fs");
const nameList = fs.readFileSync("./names.json");
var list = JSON.parse(nameList);

//Order by amount
router.get("/byAmount", (req, res) => {
  var sortedByAmount = list.names.sort((a, b) => b.amount - a.amount);
  res.status(200).json({
    sortedByAmount
  });
});

//Order by names
router.get("/byNames", (req, res) => {
  var sortedAlphabetically = list.names.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  res.status(200).json({
    sortedAlphabetically
  });
});

//Get total amount of names
router.get("/totalAmount", (req, res) => {
  const sum = list.names.reduce(function (a, b) {
    return a + b.amount;
  }, 0);
  res.status(200).json({
    totalAmount: sum
  });
});
//Get one amount of names
router.get("/:personAmount", (req, res) => {
  const person = list.names.find(
    ({ name }) => name === req.params.personAmount
  );
  res.status(200).json({
    amount: person.amount
  });
});
module.exports = router;
