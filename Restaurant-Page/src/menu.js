//Create the menu page
function createMenu(){
    let sushiMenu = ['maguro','ikura', 'salmon', 'ika', 'ebi', 'hotate'];

    let menu = document.createElement('div');
    menu.className = 'menu';

    let menuTitle = document.createElement('div');
    menuTitle.className = 'menuTitle';
    menuTitle.innerText = '- Menu -';

    let menuDisplay = document.createElement('div');
    menuDisplay.className = 'menuDisplay';

    for(let i = 0; i < sushiMenu.length; i++){
        let grid = document.createElement('div')
        grid.className = 'grid';

        let img = document.createElement('img');
        img.src = `./img/${sushiMenu[i]}.png`;

        let sushiName = document.createElement('span')
        sushiName.className = `sushiPrice`;

        sushiName.innerText = `${sushiMenu[i][0].toUpperCase() + sushiMenu[i].slice(1)} 100 yen`;

        grid.appendChild(img);
        grid.appendChild(sushiName);
        menuDisplay.appendChild(grid);
    }

    menu.appendChild(menuTitle);
    menu.appendChild(menuDisplay);

    //animate dynamically created page
    requestAnimationFrame(()=>{
        menu.style.opacity = 1;
    })
    
    return menu
}

export default createMenu