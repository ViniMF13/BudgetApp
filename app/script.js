const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

const addIncome = document.getElementById("inc");
const addExpense = document.getElementById("exp");
 
addIncome.addEventListener("click", () => {
    const incomeName = document.getElementById('incomeName').value
    const incomeValue = document.getElementById('incomeValue').value

    console.log(incomeName)
    console.log(incomeValue)


    const inputsBox = document.getElementById('showInputs')

    const newInput = document.createElement("div");
       newInput.classList.add('income')
       newInput.innerHTML = "<h3>" + `Income: ${incomeName}` + "</h3>" + "<h3>" + `${incomeValue} R$` + "</h3>";
       inputsBox.appendChild(newInput);
})

addExpense.addEventListener("click", () => {
    const expenseName = document.getElementById('expenseName').value
    const expenseValue = document.getElementById('expenseValue').value

    console.log(expenseName)
    console.log(expenseValue)


    const inputsBox = document.getElementById('showInputs')

    const newInput = document.createElement("div");
       newInput.classList.add('expense')
       newInput.innerHTML = "<h3>" + `Expense: ${expenseName}` + "</h3>" + "<h3>" + `${expenseValue} R$` + "</h3>";
       inputsBox.appendChild(newInput);


})





/*
calculateBtn.addEventListener("click", () => {
 const income = parseInt(document.getElementById("income").value);
 const expenses = parseInt(document.getElementById("expenses").value);

  if (isNaN(income) || isNaN(expenses)) {
    resultDiv.style.display = "none";
    return;
  }

  const budget = income - expenses;
  resultDiv.innerText = `Your budget for the month is $${budget}`;
  resultDiv.style.display = "block";
});
*/