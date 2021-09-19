var formNumPpl = document.getElementById("formNumberOfPeople"); 
var instructionText = document.getElementById("instructions"); 
var formNamesOfPeople = document.getElementById("formNamesOfPeople"); 
var formDishes = document.getElementById("formDishes"); 
var userInputArea = document.getElementById("userInput"); 
var names = []; 
var dishMap = new Map(); 
var dishToPeople = new Map(); 

formNumPpl.addEventListener("submit", e => {
    e.preventDefault(); 
    // take number of people input value and create a list of input fields for each name
    const numPpl = document.getElementById("numPpl").value; 
    instructionText.innerHTML = "Names of people:"; 
    // clear userInput area 
    // formNumPpl.remove();

    // get names list
    var namesList = document.getElementById("names");

    // for number of people
    // create new list element with input field
    for (let i = 0; i < numPpl; i++) {
        // <li class="name"><input type="text" class="nameText"></li>
        var nameEl = document.createElement("li"); 
        var inputEl = document.createElement("input"); 
        inputEl.type = "text"; 
        inputEl.classList.add("nameOfPerson"); 
        nameEl.appendChild(inputEl); 
        namesList.appendChild(nameEl); 
    }

    // display form names of people
    formNamesOfPeople.style.display = "block"; 
});


formNamesOfPeople.addEventListener("submit", e => {
    e.preventDefault(); // PREVENT PAGE RELOAD

  
    // populate names array from previous list 
    var namesArray = Array.from(document.getElementsByClassName("nameOfPerson")); 
    for (let name of namesArray) {
        var nameText = name.value; 
        names.push(nameText); 
    }


    // display form dishes
    formDishes.style.display = "block"; 
    // update instructions
    instructionText.innerHTML = "Dishes"; 
})

formDishes.addEventListener("submit", e => {
    e.preventDefault(); 
    // push dish name and price to dish map 
    var dishNames = Array.from(document.getElementsByClassName("dishName")); 
    var dishPrices = Array.from(document.getElementsByClassName("dishPrice"));
    var numDishes = dishNames.length; 
    for (let i = 0; i < numDishes; i++) {
        var dName = dishNames[i].value; 
        var dPrice = dishPrices[i].value; 
        dishMap.set(dName, dPrice); 
    } 
    // for each person
    for (let i = 0; i < names.length; i++) {
        // create p instruction 'what did ___ have?'
        var personInstruction = document.createElement("p"); 
        personInstruction.innerHTML = `What did ${names[i]} have?`; 
        userInputArea.appendChild(personInstruction); 

        // create form
        var personForm = document.createElement("form"); 
        personForm.id = `${names[i]}`;

        for (let j = 0; j < dishNames.length; j++) {
            var dName = dishNames[j].value; 
            // for each dish create radio button
            var radioBtn = document.createElement("input"); 
            radioBtn.type = "radio"; 
            radioBtn.id = `${dName}RadioBtn`;
            radioBtn.name = `${dName}RadioBtn`; 
            radioBtn.value = `${dName}`; 
            // create label for radio button
            var radioBtnLabel = document.createElement("label"); 
            radioBtnLabel.for = `${dName}RadioBtn`; 
            radioBtnLabel.innerHTML = `${dName}`; 
            // append to person form
            personForm.appendChild(radioBtn); 
            personForm.appendChild(radioBtnLabel); 
        }

        // append form to user input
        userInputArea.appendChild(personForm); 
    }
    // create submit button
    var submitBtn = document.createElement("button"); 
    submitBtn.type = "button"; 
    submitBtn.innerHTML = "Next"; 
    submitBtn.onclick = this.calculateSplits; 

    userInputArea.appendChild(submitBtn); 

})

function calculateSplits() {
    // create list of names 
    var splitList = document.createElement("ul"); 
    for (let i = 0; i < names.length; i++) {
        // for each name element
        // span text with total owed (id nameOwes) 
        var splitEl = document.createElement("li"); 
        var splitElP = document.createElement("p"); 
        splitElP.innerHTML = `${names[i]} owes: `; 
        var splitElSpan = document.createElement("span"); 
        splitElSpan.innerHTML = 0; 
        splitElSpan.id = `${names[i]}Owes`; 
        splitElP.appendChild(splitElSpan); 
        splitEl.appendChild(splitElP); 
        splitList.appendChild(splitEl); 
    }

    userInputArea.appendChild(splitList); 


    // map - key: dish name - value: array of people


    // for each dish
    var dishNamesArray = Array.from(dishMap.keys()); 
    for (let dName of dishNamesArray) {
        dishToPeople.set(dName, []); 
        var radioBtnsArray = Array.from(document.getElementsByName(`${dName}RadioBtn`)); 
        // map dish to array of people who had it 
        for (button of radioBtnsArray) {
            if (button.checked) {
                var personAssigned = button.parentNode.id; 
                dishToPeople.get(dName).push(personAssigned); 
            }
        }
        var dishSplit = dishMap.get(dName) / dishToPeople.get(dName).length;
        // add dishSplit amount to each person who had it 
        var peopleWhoHadDish = dishToPeople.get(dName); 
        for (person of peopleWhoHadDish) {
            var currentAmount = parseInt(document.getElementById(`${person}Owes`).innerHTML); 
            document.getElementById(`${person}Owes`).innerHTML = currentAmount + dishSplit; 
        }

    }


   
}

function addRow(){
    var tableDishes = document.getElementById("tableDishes"); 
    var tableRow = document.createElement("tr"); 

    var dishName = document.createElement("td"); 
    var dishNameInput = document.createElement("input"); 
    dishNameInput.type = "text"; 
    dishNameInput.classList.add("dishName"); 
    dishName.appendChild(dishNameInput); 

    var dishPrice = document.createElement("td"); 
    var dishPriceInput = document.createElement("input"); 
    dishPriceInput.type = "text"; 
    dishPriceInput.classList.add("dishPrice"); 
    dishPrice.appendChild(dishPriceInput); 

    tableRow.appendChild(dishName); 
    tableRow.appendChild(dishPrice); 

    tableDishes.appendChild(tableRow); 
}

