let slider = document.getElementById("myRange");
let output = document.getElementById("slideN");

let gridDiv = document.getElementsByClassName("grid")[0];
let gridChange = document.getElementById("gridChange");
let hide = document.getElementById("hide");
let reset = document.getElementById("gridReset");

let colorButton = document.querySelectorAll(".colorButton");
let defaultColor = document.getElementById("defaultColor");
let randomColor = document.getElementById("randomColor"); 
let rainbowColor = document.getElementById("rainbowColor"); 
let pickColor = document.getElementById("pickColor"); 
let eraseColor = document.getElementById("eraseColor");
let colorPick =  document.getElementsByClassName("color-pick")[0];
let colorInput = document.getElementById("colorPick");

let temp;
let colorState;
let rainbow = ['red','orange','yellow','green','blue','indigo','violet']
let inputC = 'black';

function createGrid(size){

    if(size < 2 || size > 64){
        alert("Grid size can only be between 2-64")
        return;
    }

    // Reset grid
    while(gridDiv.firstChild){
        gridDiv.removeChild(gridDiv.firstChild);
    }

    // Convert size value to int 
    let gridValue = parseInt(size);

    //Change slider value to size value if change come from input
    slider.value = size;

    // Change slider value text 
    output.innerHTML = size + ' x ' + size;

    // Change grid size on css
    gridDiv.style.gridTemplateColumns = `repeat(${gridValue}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${gridValue}, 1fr)`;

    // Create new grid according to size 
    for(let i = 0; i < Math.pow(gridValue,2); i++){
        let newGrid = document.createElement("div");
        newGrid.className = "newGrid disable-select";
        newGrid.id = `${i}`
        gridDiv.appendChild(newGrid);
    }

    // Variable to select all new grid
    temp = document.querySelectorAll('.newGrid');

    //Iterate over all new grid and add an event listener
    temp.forEach(item => {
        item.addEventListener('mouseover', event => {
            if(event.buttons == 1){
                draw(event.target,colorState);
            }
        })
        item.addEventListener('mousedown', event => {
            draw(event.target,colorState);
        })
      })
}

function draw(grid, color){
    switch(color){
        case "Random":
            grid.style.backgroundColor = `rgb(${random()},${random()},${random()})`;
            break;
        case "Rainbow":
            grid.style.backgroundColor = `${rainbowDraw()}`;
            break;
        case "Pick color":
            grid.style.backgroundColor = inputC;
            break;
        case "Eraser":
            grid.style.backgroundColor = 'white';
            break;
        default:
            grid.style.backgroundColor = 'black';
    }
    
}

function random(){
    return Math.floor(Math.random()*255);
}

function rainbowDraw(){
    let color = rainbow[0]
    rainbow.splice(0,1);
    rainbow.splice(rainbow.length,0,color);
    return color;
}

slider.oninput = function() {
    if(hide.innerText == "Show grid"){
        hide.innerText = "Hide grid";
    }
    createGrid(slider.value);
}

// On grid size input
gridChange.addEventListener("click", function(){
    let input = document.getElementById("gridInput").value;
    document.getElementById("gridInput").value = '';
    createGrid(input);
})

hide.addEventListener("click", function(){
    temp = document.querySelectorAll('.newGrid');
    if(hide.innerText == "Hide grid"){
        hide.innerText = "Show grid";
        temp.forEach(el => {
            el.style.border = 'none';})
    }
    else{
        hide.innerText = "Hide grid";
        temp.forEach(el => {
            el.style.border = 'solid 1px black';})
    }
})

// On reset button
reset.addEventListener("click", function(){
    temp.forEach(item =>{
        item.style.backgroundColor = "white";
    })
})

// Highlight pressed color button
colorButton.forEach(el => el.addEventListener("click", e =>{
    colorButton.forEach(el => el.style.borderColor = '');
    e.target.style.borderColor = "orange";
    colorState = e.target.innerText;
    (colorState == "Pick color")? colorPick.style.display="block":colorPick.style.display="none";
}))

colorInput.addEventListener('input', () => {
    inputC = colorInput.value;
})
colorInput.addEventListener('change', () => {
    inputC = colorInput.value;
})

createGrid(slider.value);