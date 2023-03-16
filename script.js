const addIncome = document.getElementById("inc")
const addExpense = document.getElementById("exp")
const addInvestment = document.getElementById('inv')

const inputsList = document.getElementById('inputsList')

let inputData = {
  inputs: []
}

//get the data from localStorage and show the data on the inputList 
let storedData = localStorage.getItem("inputData")
if (storedData) {
  inputData = JSON.parse(storedData)
  inputsList.classList.remove('none')
}

for(let i = 0; i < inputData.inputs.length; i++){
  const newInput = document.createElement("li")
  newInput.classList.add(inputData.inputs[i].type)
  newInput.innerHTML = "<h3>" + inputData.inputs[i].name + "</h3>" + "<h3>" + `${inputData.inputs[i].value} R$` + "</h3>"
  inputsList.appendChild(newInput)
}

// show the value of the inputs at the end of the inputsList
  let totalIncomes = 0
  let totalExpenses = 0
  let totalInvestments = 0

  for(let i = 0; i < inputData.inputs.length; i++){
    if (inputData.inputs[i].type == "income"){
      let income = parseInt(inputData.inputs[i].value)
      totalIncomes = totalIncomes + income
    }
  }
  const showIncomes = document.getElementById('totalIncomes')
  showIncomes.innerHTML = '<h3>' + totalIncomes + '</h3>'  + "<h3> R$ </h3>"

  for(let i = 0; i < inputData.inputs.length; i++){
  
    if (inputData.inputs[i].type == "expense"){
      let expense = parseInt(inputData.inputs[i].value)
      totalExpenses = totalExpenses + expense
    }
  }
  const showExpenses = document.getElementById('totalExpenses')
  showExpenses.innerHTML = '<h3>' + totalExpenses + '</h3>'  + "<h3> R$ </h3>" 

  for(let i = 0; i < inputData.inputs.length; i++){
  
    if (inputData.inputs[i].type == "investment"){
      let investment = parseInt(inputData.inputs[i].value)
      totalInvestments = totalInvestments + investment
    }
  }
  const showInvestments = document.getElementById('totalInvestments')
  showInvestments.innerHTML = '<h3>' + totalInvestments + '</h3>' + "<h3> R$ </h3>"

// add values from inputs on the inputData array
addIncome.addEventListener("click", () => {
    const incomeName = document.getElementById('incomeName').value
    const incomeValue = document.getElementById('incomeValue').value
    inputsList.classList.remove('none')
    
    if(incomeName == '' || incomeValue == ''){
      return
    }

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

    document.getElementById("incomeName").value = "";
    document.getElementById("incomeValue").value = "";
})

addExpense.addEventListener("click", () => {
    const expenseName = document.getElementById('expenseName').value
    const expenseValue = document.getElementById('expenseValue').value

    if(expenseName == '' || expenseValue == ''){
      return
    }

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
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseValue").value = "";

})

addInvestment.addEventListener("click", () => {
  const investmentName = document.getElementById('investmentName').value
  const investmentValue = document.getElementById('investmentValue').value

  if(investmentName == '' || investmentValue == ''){
    return
  }

  const newItem = {
    name: investmentName,
    value: investmentValue,
    type: "investment"
  } 

  inputData.inputs.push(newItem)

  const newInput = document.createElement("li");
     newInput.innerHTML = "<h3>" + `investment: ${newItem.name}` + "</h3>" + "<h3>" + `${newItem.value} R$` + "</h3>"
     newInput.classList.add(newItem.type)
     inputsList.appendChild(newInput)

  localStorage.setItem("inputData", JSON.stringify(inputData))

  document.getElementById("investmentName").value = "";
  document.getElementById("investmentValue").value = "";
})

const showResults = document.getElementById('showResults')

const resultButton = document.getElementById('resultsButton')
resultButton.addEventListener('click', ()=>  {

  showResults.classList.remove('none')

  const periodStart = document.getElementById('periodStart').value
  const periodEnd = document.getElementById('periodEnd').value
  const newPeriod = document.createElement('h3')
  newPeriod.innerHTML = `De: ${periodStart} até ${periodEnd}`


  const newChart = document.createElement('canvas')
  var ctx = newChart.getContext('2d');

  var data = {
    labels: ['income', 'expense', 'investments'],
    datasets: [{
    data: [totalIncomes, totalExpenses, totalInvestments],
    backgroundColor: ['#00a67d', '#f22c3d', '#7922eb',]
    }]
  }
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
   })

  const InputsHistoric = document.createElement('ul')

  for(let i = 0; i < inputData.inputs.length; i++){
  const newInput = document.createElement("li");
  newInput.classList.add(inputData.inputs[i].type)
  newInput.innerHTML = "<h5>" + inputData.inputs[i].name + "</h5>" + "<h5>" + `${inputData.inputs[i].value} R$` + "</h5>";
  InputsHistoric.appendChild(newInput)
}

  showResults.appendChild(newPeriod)
  showResults.appendChild(newChart)
  showResults.appendChild(InputsHistoric)
  
})



/*
let historicData = {
  totals: [],
  inputs: []
}

let storedHistoric = localStorage.getItem("historicData")
if (storedHistoric) {
  storedHistoric = JSON.parse(historicData)
  showResults.classList.remove('none')
}

for(let i = 0; i < historicData.size.length; i++){
 console.log()
}
*/