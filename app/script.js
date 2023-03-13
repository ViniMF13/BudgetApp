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
  inputsList.classList.remove('none')
}

for(let i = 0; i < inputData.inputs.length; i++){
  const newInput = document.createElement("li");
  newInput.classList.add(inputData.inputs[i].type)
  newInput.innerHTML = "<h3>" + inputData.inputs[i].name + "</h3>" + "<h3>" + `${inputData.inputs[i].value} R$` + "</h3>";
  inputsList.appendChild(newInput)
}

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
     newInput.innerHTML = "<h3>" + `investment: ${newItem.name}` + "</h3>" + "<h3>" + `${newItem.value} R$` + "</h3>";
     newInput.classList.add(newItem.type)
     inputsList.appendChild(newInput)

  localStorage.setItem("inputData", JSON.stringify(inputData))

  document.getElementById("investmentName").value = "";
  document.getElementById("investmentValue").value = "";
})


const resultButton = document.getElementById('resultsButton')

resultButton.addEventListener('click', ()=>  {
  const showResults = document.getElementById('showResults')
  showResults.classList.remove('none')

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


  // Define the data to display in the pie chart
  var ctx = document.getElementById('myChart').getContext('2d');
  var data = {
    labels: ['income', 'expense', 'investments'],
    datasets: [{
    data: [totalIncomes, totalExpenses, totalInvestments],
    backgroundColor: ['#00a67d', '#f22c3d', '#7922eb',]
    }]
  }

  // Create the pie chart
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
   })

  })





/*
function createChart() {
  let categorys = []

  for(let i = 0; i < inputData.inputs.length; i++){

    if (inputData.inputs[i].type == "expense"){
 
      let category = inputData.inputs[i].name
      categorys.push(category)
    }
  }
      console.log(categorys)

    var ctx = document.getElementById('myChart').getContext('2d');
    // Define the data to display in the pie chart
    var data = {
        labels: categorys,
        datasets: [{
          data: [100, 200, 300],
          backgroundColor: ['#00a67d', '#f22c3d', '#7922eb',]
        }]
      }
      
      // Create the pie chart
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
}

createChart()

resultButton.addEventListener('click', ()=>  {

  const showResults = document.getElementById('showResults')
  showResults.classList.remove('none')

  let totalIncomes = 0
  let totalExpenses = 0
  let totalInvestments = 0

  for(let i = 0; i < inputData.inputs.length; i++){

    if (inputData.inputs[i].type == "income"){
      let income = parseInt(inputData.inputs[i].value)
      totalIncomes = totalIncomes + income
    }
    else if (inputData.inputs[i].type == "expense"){
        let expense = parseInt(inputData.inputs[i].value)
        totalExpenses = totalExpenses + expense
    }
    else if (inputData.inputs[i].type == "investment"){
      let investment = parseInt(inputData.inputs[i].value)
      totalInvestments = totalInvestments + investment
    }
  

    const showIncomes = document.getElementById('totalIncomes')
    showIncomes.innerHTML = '<h3>' + totalIncomes + '</h3>'  + "<h3> R$ </h3>"

    const showExpenses = document.getElementById('totalExpenses')
    showExpenses.innerHTML = '<h3>' + totalExpenses + '</h3>'  + "<h3> R$ </h3>" 

    const showInvestments = document.getElementById('totalInvestments')
    showInvestments.innerHTML = '<h3>' + totalInvestments + '</h3>' + "<h3> R$ </h3>"



  

})


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