//Create home page
function createHome(){
    let sushiHome = document.createElement('div')
    sushiHome.className = 'sushiHome';

    let homeTitle = document.createElement('div');
    homeTitle.className = 'homeTitle';
    homeTitle.innerText = 'Fresh sushi roll';

    let homeBtn = document.createElement('button');
    homeBtn.className = 'menuBtn';
    homeBtn.innerText = 'Our Menu >';

    sushiHome.appendChild(homeTitle);
    sushiHome.appendChild(homeBtn);

    return sushiHome;
}

export default createHome