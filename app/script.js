const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

const addIncome = document.getElementById("inc");
const addExpense = document.getElementById("exp");
const addInvestment = document.getElementById('inv')

const inputsList = document.getElementById('inputsList')

let inputData = {
  inputs: []
}

let storedData = localStorage.getItem("inputData");
if (storedData) {
  inputData = JSON.parse(storedData);
}

for(let i = 0; i < inputData.inputs.length; i++){
  const newInput = document.createElement("li");
  newInput.classList.add(inputData.inputs[i].type)
  newInput.innerHTML = "<h3>" + `Income: ${inputData.inputs[i].name}` + "</h3>" + "<h3>" + `${inputData.inputs[i].value} R$` + "</h3>";
  inputsList.appendChild(newInput)
}

addIncome.addEventListener("click", () => {
    const incomeName = document.getElementById('incomeName').value
    const incomeValue = document.getElementById('incomeValue').value

    const newItem = {
      name: incomeName,
      value: incomeValue,
      type: "income"
    }  

    inputData.inputs.push(newItem)

    const newInput = document.createElement("li");
       newInput.innerHTML = "<h3>" + `Income: ${newItem.name}` + "</h3>" + "<h3>" + `${newItem.value} R$` + "</h3>";
       newInput.classList.add(newItem.type)
       inputsList.appendChild(newInput)

    localStorage.setItem("inputData", JSON.stringify(inputData))
})

addExpense.addEventListener("click", () => {
    const expenseName = document.getElementById('expenseName').value
    const expenseValue = document.getElementById('expenseValue').value

    const newItem = {
      name: expenseName,
      value: expenseValue,
      type: "expense"
    } 

    inputData.inputs.push(newItem)

    const newInput = document.createElement("li");
       newInput.innerHTML = "<h3>" + `Expense: ${newItem.name}` + "</h3>" + "<h3>" + `${newItem.value} R$` + "</h3>";
       newInput.classList.add(newItem.type)
       inputsList.appendChild(newInput)

    localStorage.setItem("inputData", JSON.stringify(inputData))

})

addInvestment.addEventListener("click", () => {
  const investmentName = document.getElementById('investmentName').value
  const investmentValue = document.getElementById('investmentValue').value

  const newItem = {
    name: investmentName,
    value: investmentValue,
    type: "investment"
  } 

  inputData.inputs.push(newItem)

  const newInput = document.createElement("li");
     newInput.innerHTML = "<h3>" + `investment: ${newItem.name}` + "</h3>" + "<h3>" + `${newItem.value} R$` + "</h3>";
     newInput.classList.add(newItem.type)
     inputsList.appendChild(newInput)

  localStorage.setItem("inputData", JSON.stringify(inputData))
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