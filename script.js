const addIncome = document.getElementById("inc")
const addExpense = document.getElementById("exp")
const addInvestment = document.getElementById('inv')

const inputsList = document.getElementById('inputsList')
const listHeader = document.getElementById('listHeader')

let inputData = {
  inputs: []
}

//get data from localStorage and show on inputsList 
let storedData = localStorage.getItem("inputData")
if (storedData) {
  inputData = JSON.parse(storedData)
  inputsList.classList.remove('none')
  listHeader.classList.remove('none')
}
for(let i = 0; i < inputData.inputs.length; i++){
  const newInput = document.createElement("li")
  newInput.classList.add(inputData.inputs[i].type)
  newInput.innerHTML = "<h3>"+ inputData.inputs[i].name +"</h3>" + "<p>"+ inputData.inputs[i].category +"</p>" + "<h3>" + `${inputData.inputs[i].value} R$` + "</h3>" + "<p>"+ inputData.inputs[i].date +"</p>"
  inputsList.appendChild(newInput)
}

// add values from inputs on the inputData array
addIncome.addEventListener("click", () => {
    const incomeName = document.getElementById('name').value
    const incomeValue = document.getElementById('value').value
    const incomeCategory = document.getElementById('category').value
    const incomeDate = document.getElementById('date').value
    
    if(incomeName == '' || incomeValue == '' || incomeCategory == '' || incomeDate == ''){
      return
    }

    inputsList.classList.remove('none')
    listHeader.classList.remove('none')

    const newItem = {
        name: incomeName,
        value: incomeValue,
        category: incomeCategory,
        date: incomeDate,
        type: "income"
      }  
    inputData.inputs.push(newItem)
  
    const newInput = document.createElement("li")
         newInput.innerHTML = "<h3>"+ newItem.name +"</h3>" + "<p>"+ newItem.category +"</p>" + "<h3>" + `${newItem.value} R$` + "</h3>" + "<p>"+ newItem.date +"</p>"
         newInput.classList.add(newItem.type)
         inputsList.appendChild(newInput)

    localStorage.setItem("inputData", JSON.stringify(inputData))

    document.getElementById("name").value = ""
    document.getElementById("value").value = ""
    document.getElementById("date").value = ""
    document.getElementById("category").value = ""
})

addExpense.addEventListener("click", () => {
    const expenseName = document.getElementById('name').value
    const expenseValue = document.getElementById('value').value
    const expenseCategory = document.getElementById('category').value
    const expenseDate = document.getElementById('date').value

    if(expenseName == '' || expenseValue == '' || expenseCategory == '' || expenseDate == ''){
      return
    }

    inputsList.classList.remove('none')
    listHeader.classList.remove('none')
    
    const newItem = {
      name: expenseName,
      value: expenseValue,
      category: expenseCategory,
      date: expenseDate,
      type: "expense"
    } 
    inputData.inputs.push(newItem)

    const newInput = document.createElement("li");
       newInput.innerHTML = "<h3>"+ newItem.name +"</h3>" + "<p>"+ newItem.category +"</p>" + "<h3>" + `${newItem.value} R$` + "</h3>" + "<p>"+ newItem.date +"</p>"
       newInput.classList.add(newItem.type)
       inputsList.appendChild(newInput)

    localStorage.setItem("inputData", JSON.stringify(inputData))

    document.getElementById("name").value = ""
    document.getElementById("value").value = ""
    document.getElementById("date").value = ""
    document.getElementById("category").value = ""
})

addInvestment.addEventListener("click", () => {
  const investmentName = document.getElementById('name').value
  const investmentValue = document.getElementById('value').value
  const investmentCategory = document.getElementById('category').value
  const investmentDate = document.getElementById('date').value

  if(investmentName == '' || investmentValue == ''|| investmentCategory == '' || investmentDate == ''){
    return
  }

  inputsList.classList.remove('none')
  listHeader.classList.remove('none')
  
  const newItem = {
    name: investmentName,
    value: investmentValue,
    category: investmentCategory,
    date: investmentDate,
    type: "investment"
  } 

  const newInput = document.createElement("li");
     newInput.innerHTML = "<h3>"+ newItem.name +"</h3>" + "<p>"+ newItem.category +"</p>" + "<h3>" + `${newItem.value} R$` + "</h3>" + "<p>"+ newItem.date +"</p>"
     newInput.classList.add(newItem.type)
     inputsList.appendChild(newInput)
  inputData.inputs.push(newItem)

  localStorage.setItem("inputData", JSON.stringify(inputData))

  document.getElementById("name").value = ""
  document.getElementById("value").value = ""
  document.getElementById("date").value = ""
  document.getElementById("category").value = ""
})

// calculate totals
let totalIncomes = 0
let totalExpenses = 0
let totalInvestments = 0

for(let i = 0; i < inputData.inputs.length; i++){
  if (inputData.inputs[i].type == "income"){
    let income = parseInt(inputData.inputs[i].value)
    totalIncomes = totalIncomes + income
  }
  else if(inputData.inputs[i].type == "expense"){
    let expense = parseInt(inputData.inputs[i].value)
    totalExpenses = totalExpenses + expense
  }
  else if(inputData.inputs[i].type == "investment"){
    let investment = parseInt(inputData.inputs[i].value)
    totalInvestments = totalInvestments + investment
  }
}

// Results
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
    newInput.innerHTML = "<h5>"+historicData[i].inputs[j].name+"</h5>" + "<p>"+historicData[i].inputs[j].category+"</p>" + "<h5>"+`${historicData[i].inputs[j].value} R$`+"</h5>" + "<p>"+historicData[i].inputs[j].date+"</p>" 
    InputsHistoric.appendChild(newInput)
  }

  showResults.appendChild(newPeriod)
  showResults.appendChild(newChart)
  showResults.appendChild(InputsHistoric)
}


const resultButton = document.getElementById('resultsButton')
resultButton.addEventListener('click', ()=>  {
  const periodStart = inputData.inputs[0].date
  const periodEnd = inputData.inputs[inputData.inputs.length - 1].date

  if(inputData.inputs.length === 0){
    alert('adicione dados para fechar periodo.')
    return 0
  }
  showResults.classList.remove('none')

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
  
  localStorage.removeItem('inputData')
  location.reload()
  })


