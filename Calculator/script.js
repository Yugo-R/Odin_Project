const calculator = document.querySelector('.calculatorBody');
const screen = document.getElementsByClassName('screen')[0];
let totalDigit = 0;
let isDecimal = false;
let inOperation = false;
let signTouched = false;
let storeNumber = [];
let result = 0;
let sign = '';
// let numberDict = {
//     inputedNumber : 0,
//     result : 0,
//     sign : ''
// };
//when the page load reset the screen
window.addEventListener('load', function(){
    outputOnScreen(0);
})

calculator.addEventListener('click', function(e){
    switch(e.target.className){
        case 'numericButton':
            screenInput(parseInt(e.target.textContent));
            break;
        case 'clear':
            clearCalcALL();
            break;
        case 'dot':
            decimalNumber();
            break;
        case 'addition':
            if(!inOperation){
                result = Number(storeNumber.join(''));
                inOperation = true;
                signTouched = true;
                sign = '+'
            }
            else{
                operate(sign);
                signTouched = true;
                sign = '+';
            }
            break;
        case 'substract':
            if(!inOperation){
                result = Number(storeNumber.join(''));
                inOperation = true;
                signTouched = true;
                sign = '-'
            }
            else{
                operate(sign);
                signTouched = true;
                sign = '-';
            }
            break;
        case 'multiplication':
            if(!inOperation){
                result = Number(storeNumber.join(''));
                inOperation = true;
                signTouched = true;
                sign = '*'
            }
            else{
                operate(sign);
                signTouched = true;
                sign = '*';
            }
            break;
        case 'division':
            if(!inOperation){
                result = Number(storeNumber.join(''));
                inOperation = true;
                signTouched = true;
                sign = '÷'
            }
            else{
                operate(sign);
                signTouched = true;
                sign = '÷';
            }
            break;
        case 'equal':
            operate(sign);
            break;
    }

});

function operate(){
    switch(sign){
        case '+':
            result += Number(storeNumber.join(''));
            displayResult(result);
            break;
        case '-':
            result -= Number(storeNumber.join(''));
            displayResult(result);
            break;
        case '*':
            result *= Number(storeNumber.join(''));
            displayResult(result);
            break;
        case '÷':
            result /= Number(storeNumber.join(''));
            displayResult(result);
            break;
        default:
            alert(result);
    }
}

function screenInput(number){
    if(signTouched){
        clearCalc();
        outputOnScreen(number);
    }
    else if(totalDigit == 9){
        return
    }
    else{
        outputOnScreen(number);
    }
}

function createDigit(){
    let divs = document.querySelectorAll('.screen span');
    for(let i=0; i < divs.length; i++ ){
        divs[i].style.gridColumnStart = divs[i].style.gridColumnStart - 1;
        divs[i].style.gridRowStart = 0;
        divs[i].id = `output${i}`;
        // If comma or not after a number for thousand millions...
        if(divs[i].style.gridColumnStart % 3 == 0 && !isDecimal){
            divs[i].innerHTML = divs[i].innerHTML + ',';
        }
        else{
            divs[i].innerHTML = divs[i].innerHTML.split(',').join('');
        }
    }
}

function outputOnScreen(n){
    if(document.getElementById('isScreen').childElementCount == 1 && document.getElementById('outputFirst').innerHTML == 0 && !isDecimal){
        if(n == 0){
            return
        }
        else{
            document.getElementById('outputFirst').innerHTML = n;
            document.getElementById('clearButton').innerHTML = 'C';
            totalDigit += 1;
            storeNumber.push(n);
        }
    }
    else{
        createDigit();
        let newDigit = document.createElement('span');
        newDigit.id = 'outputFirst';
        newDigit.innerHTML = n;
        newDigit.style.gridColumnStart = 9;
        newDigit.style.gridRowStart = 0;
        screen.appendChild(newDigit);

        if(document.getElementById('isScreen').childElementCount == 1 && document.getElementById('outputFirst').innerHTML == 0){
            return
        }
        else{
            document.getElementById('clearButton').innerHTML = 'C';
            totalDigit += 1;
            storeNumber.push(n);
        }
        
    }

}

function displayResult(result){
    //Reset screen
    while(screen.firstChild) {
        screen.removeChild(screen.lastChild);
    }
    totalDigit = 0;
    storeNumber.length = 0;

    let num = Math.abs(result);
    numArr = String(num).split('');

    console.log(numArr);
    for(let i=0; i < numArr.length; i++){
        if(i == 0 && result < 0){
            outputOnScreen(-Math.abs(Number(numArr[i])));
        }
        else if(numArr[i] == '.'){
            document.getElementById('outputFirst').innerHTML = document.getElementById('outputFirst').innerHTML + '.';   
        }
        else{
            outputOnScreen(numArr[i]);
        }
    }
}

function clearCalcALL(){
    let firstEle = document.getElementById('outputFirst')
    if(totalDigit > 0 || firstEle.innerHTML != 0 || isDecimal){ 
        while(screen.firstChild) {
            screen.removeChild(screen.lastChild);
        }
        outputOnScreen(0);
        document.getElementById('clearButton').innerHTML = 'AC';
        totalDigit = 0;
        storeNumber.length = 0;
        result = 0;
        isDecimal = false;
        inOperation = false;
        signTouched = false;
    }
}

function clearCalc(){
    while(screen.firstChild) {
        screen.removeChild(screen.lastChild);
    }
    storeNumber.length = 0;
    isDecimal = false;
    signTouched = false;
    totalDigit = 0;
}

function decimalNumber(){
    if(isDecimal || totalDigit == 9){
        return
    }
    else{
        storeNumber.push('.');
        let firstEle = document.getElementById('outputFirst');
        firstEle.innerHTML = firstEle.innerHTML + '.';
        firstEle.innerHTML == '0.'? document.getElementById('clearButton').innerHTML = 'C':false;
        isDecimal = true;
    }
    
}