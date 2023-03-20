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
  newInput.innerHTML = "<h3>"+ inputData.inputs[i].name +"</h3>" + "<p>"+ inputData.inputs[i].category +"</p>" + "<h3>" + `${inputData.inputs[i].value} R$` + "</h3>" + "<p>"+ inputData.inputs[i].date +"</p>"
  inputsList.appendChild(newInput)
}

// add values from inputs on the inputData array
addIncome.addEventListener("click", () => {
    const incomeName = document.getElementById('incomeName').value
    const incomeValue = document.getElementById('incomeValue').value
    const incomeCategory = document.getElementById('incomeCategory').value
    const incomeDate = document.getElementById('incomeDate').value

    inputsList.classList.remove('none')
    
    if(incomeName == '' || incomeValue == '' || incomeCategory == '' || incomeDate == ''){
      return
    }
    const newItem = {
        name: incomeName,
        value: incomeValue,
        category: incomeCategory,
        date: incomeDate,
        type: "income"
      }  
  
    inputData.inputs.push(newItem)
  
    const newInput = document.createElement("li");
         newInput.innerHTML = "<h3>"+ newInput.name +"</h3>" + "<p>"+ newInput.category +"</p>" + "<h3>" + `${newInput.value} R$` + "</h3>" + "<p>"+ newInput.date +"</p>"
         newInput.classList.add(newItem.type)
         inputsList.appendChild(newInput)
         
  
    localStorage.setItem("inputData", JSON.stringify(inputData))

    document.getElementById("incomeName").value = ""
    document.getElementById("incomeValue").value = ""
    document.getElementById("investmentDate").value = ""
    document.getElementById("investmentCategory").value = ""
})

addExpense.addEventListener("click", () => {
    const expenseName = document.getElementById('expenseName').value
    const expenseValue = document.getElementById('expenseValue').value
    const expenseCategory = document.getElementById('expenseCategory').value
    const expenseDate = document.getElementById('expenseDate').value

    if(expenseName == '' || expenseValue == '' || expenseCategory == '' || expenseDate == ''){
      return
    }

    const newItem = {
      name: expenseName,
      value: expenseValue,
      category: expenseCategory,
      date: expenseDate,
      type: "expense"
    } 

    inputData.inputs.push(newItem)

    const newInput = document.createElement("li");
       newInput.innerHTML = "<h3>"+ newInput.name +"</h3>" + "<p>"+ newInput.category +"</p>" + "<h3>" + `${newInput.value} R$` + "</h3>" + "<p>"+ newInput.date +"</p>"
       newInput.classList.add(newItem.type)
       inputsList.appendChild(newInput)

    localStorage.setItem("inputData", JSON.stringify(inputData))

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseValue").value = "";
    document.getElementById("investmentCategory").value = "";
    document.getElementById("investmentDate").value = "";

})

addInvestment.addEventListener("click", () => {
  const investmentName = document.getElementById('investmentName').value
  const investmentValue = document.getElementById('investmentValue').value
  const investmentCategory = document.getElementById('investmentCategory').value
  const investmentDate = document.getElementById('investmentDate').value

  if(investmentName == '' || investmentValue == ''|| investmentCategory == '' || investmentDate == ''){
    return
  }

  const newItem = {
    name: investmentName,
    value: investmentValue,
    category: investmentCategory,
    date: investmentDate,
    type: "investment"
  } 


  const newInput = document.createElement("li");
     newInput.innerHTML = "<h3>"+ newInput.name +"</h3>" + "<p>"+ newInput.category +"</p>" + "<h3>" + `${newInput.value} R$` + "</h3>" + "<p>"+ newInput.date +"</p>"
     newInput.classList.add(newItem.type)
     inputsList.appendChild(newInput)

  inputData.inputs.push(newItem)
  localStorage.setItem("inputData", JSON.stringify(inputData))

  document.getElementById("investmentName").value = "";
  document.getElementById("investmentValue").value = "";
  document.getElementById("investmentCategory").value = "";
  document.getElementById("investmentDate").value = "";
})

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


const showResults = document.getElementById('showResults')

let historicData = []

let storedHistoric = localStorage.getItem("historicData")
if (storedHistoric) {
  historicData = JSON.parse(storedHistoric)
  showResults.classList.remove('none')
}

for(let i = 0; i < historicData.length; i++){
  const newPeriod = document.createElement('h3')
  newPeriod.innerHTML = `De: ${historicData[i].period[0]} até ${historicData[i].period[1]}`

  const newChart = document.createElement('canvas')
  var ctx = newChart.getContext('2d');
  var data = {
    labels: ['income', 'expense', 'investments'],
    datasets: [{
    data: [historicData[i].total[0], historicData[i].total[1], historicData[i].total[2]],
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
  for(let j = 0; j < historicData[i].inputs.length; j++){
    const newInput = document.createElement("li");
    newInput.classList.add(historicData[i].inputs[j].type)
    newInput.innerHTML = "<h5>" + historicData[i].inputs[j].name + "</h5>" + "<h5>" + `${historicData[i].inputs[j].value} R$` + "</h5>";
    InputsHistoric.appendChild(newInput)
  }

  showResults.appendChild(newPeriod)
  showResults.appendChild(newChart)
  showResults.appendChild(InputsHistoric)
}


const resultButton = document.getElementById('resultsButton')
resultButton.addEventListener('click', ()=>  {

  showResults.classList.remove('none')

  const periodStart = document.getElementById('periodStart').value
  const periodEnd = document.getElementById('periodEnd').value

  let resultData = {
    period: [periodStart, periodEnd],
    inputs: inputData.inputs,
    total: [totalIncomes, totalExpenses, totalInvestments]
  }
  
  historicData.push(resultData)
  localStorage.setItem("historicData", JSON.stringify(historicData))


  const newPeriod = document.createElement('h3')
  newPeriod.innerHTML = `De: ${resultData.period[0]} até ${resultData.period[1]}`

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


  //const newPeriod = document.createElement('h3')
  //newPeriod.innerHTML = `De: ${periodStart} até ${periodEnd}`



 /*  

  x 
 


  

  
  
  
*/



/*
let resultData = {
  totals: [],
  inputs: []
}

let storedHistoric = localStorage.getItem("resultData")
if (storedHistoric) {
  storedHistoric = JSON.parse(resultData)
  showResults.classList.remove('none')
}

for(let i = 0; i < resultData.size.length; i++){
 console.log()
}
*/