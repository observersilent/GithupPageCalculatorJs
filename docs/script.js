const display = document.getElementById('display');
const btnsDigits = document.getElementsByClassName('btn-digit');
const btnsActions = document.getElementsByClassName('btn-action');
const btnResult = document.getElementById('btn-result');
const btnDot = document.getElementById('btn-dot');
const btnCleanAll = document.getElementById('btn-clear-all');
const btnBack = document.getElementById('btn-back');

let currentValue = "";
let firstValue = null;
let secondValue = null;
let currentAction = "";

function clearValues() {
    firstValue = null;
    secondValue = null;
    currentAction = "";
    currentValue = ""
};

function calculate(first, second, action) {
    if (first !== null && second !== null) {
        let result;

        switch(action) {
            case "+":
                result = first + second;
                break;

            case "-":
                result = first - second;
                break;

            case "*":
                result = first * second;
                break;

            case "/":
                if (second === 0) {
                    result = "Бесконечность"
                    break;
                }
                result = first / second;
                break;

            case "pow":
                result = Math.pow(first, second);
                break;

            case "rt":
                result = Math.pow(first, 1.0/second);
                break;            
        }
        return result;
    } 
    return "Некорректные значения";
}

function bindEventsBtnsDigits() {
    for(let i = 0; i < btnsDigits.length; i++) {
        const btn = btnsDigits[i];
        const digit = btn.getAttribute('data-digit');
        
        btn.addEventListener('click', function() {
            currentValue += digit;
            display.innerText = currentValue;
        })
    }
};

function bindEventsBtnsActions() {
    for(let i = 0; i < btnsActions.length; i++) {
        const btn = btnsActions[i];
        const action = btn.getAttribute('data-action');
        btn.addEventListener('click', function() {
            if(currentValue != '') { //промежуточный значения вычислений трогать низя
                if (currentAction === "") {
                    currentAction = action;
        
                    if (firstValue === null) {
                        firstValue = parseFloat(currentValue);
                    } 
                    else {
                        secondValue = parseFloat(currentValue);
                    }
                    
                    display.innerText = 0;    
                } 
                else {
                    firstValue = calculate(parseFloat(firstValue), parseFloat(currentValue), currentAction);
                    firstValue = Math.floor(firstValue * 1000) / 1000;
                    currentAction = action;              
                    display.innerText = firstValue;
                }
                currentValue = '';
            }            
        })
    }
};

btnResult.addEventListener('click', function() {
    if(firstValue != null) {
        secondValue = parseFloat(currentValue);
        firstValue = calculate(firstValue, secondValue, currentAction);
        firstValue = Math.floor(firstValue * 1000) / 1000;
        display.innerText = firstValue;
        clearValues();
    }
    else {
        display.innerText = 'Введи число';
        clearValues();
    }
    
});

btnDot.addEventListener('click', function(){
    if(!(currentValue === '' && firstValue !== null)) { //промежуточный значения вычислений трогать низя
        if(currentValue === '') {
            currentValue += '0.';
            display.innerText = currentValue;    
        }
    
        if(!currentValue.includes('.')) {
            currentValue += '.';
            display.innerText = currentValue; 
        }
    }   
});

btnCleanAll.addEventListener('click', function(){
    clearValues();
    display.innerText = 'Введи число';
});

btnBack.addEventListener('click', function(){
    if(currentValue != '') {                //промежуточный значения вычислений трогать низя
        if(currentValue.length === 1) {
            currentValue = '';
            display.innerText = 'Введи число';
        }
        else {
            currentValue = currentValue.substring(0, currentValue.length-1);
            display.innerText = currentValue;
        }
    }
    
});

bindEventsBtnsDigits();
bindEventsBtnsActions();