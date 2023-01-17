import createHome from './home.js';
import createMenu from './menu.js';
import createContact from './contact.js';

const content = document.querySelector('#content');

//On page load up//
window.addEventListener('load', ()=>{
    content.appendChild(createHome());
    let menuBtn = document.querySelector('.menuBtn')
    menuBtn.addEventListener('click', ()=>{
        clearContent();
        requestAnimationFrame(()=>{
            content.appendChild(createMenu());
        })
    });
})


//create navpage
document.querySelector('.nav-button').addEventListener('click', ()=>{
    let overlay = document.querySelector('.navbarOverlay');
    overlay.classList.add('active');
    let ul = document.createElement('ul');
    let navlist = ['Home', 'Menu', 'Contacts']

    for(let i = 0; i < navlist.length; i++){
        let li = document.createElement('li');
        let btn = document.createElement('button');
        btn.className = 'navBtn';
        btn.innerText = navlist[i];
        li.appendChild(btn);
        ul.appendChild(li);
    }
    let closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.className = 'overlayClose';
    closeButton.dataset.overlayclose = '.navbarOverlay';

    overlay.appendChild(ul);
    overlay.appendChild(closeButton);
    
    //Close button on navigation for mobile
    document.querySelector('.overlayClose').addEventListener('click', (e)=>{
        closeOverlay(overlay);
    })
    

    //on nav btn click
    ul.onclick = function(event){
        let target = event.target;
        if(target.innerText == 'Home'){
            clearContent();
            content.appendChild(createHome());
            let menuBtn = document.querySelector('.menuBtn')
            menuBtn.addEventListener('click', ()=>{
                clearContent();
                requestAnimationFrame(()=>{
                content.appendChild(createMenu());
                })
             });
            closeOverlay(overlay);
        }
        if(target.innerText == 'Menu'){
            clearContent();
            content.appendChild(createMenu());
            closeOverlay(overlay);
        }
        if(target.innerText == 'Contacts'){
            clearContent();
            content.appendChild(createContact());
            closeOverlay(overlay);
        }
        
    }
})

//Close overlay window
function closeOverlay(overlay){
        overlay.classList.add('out');

        setTimeout(function(){ 
            overlay.classList.remove('active');
            overlay.classList.remove('out');

            while(overlay.firstChild){
                overlay.removeChild(overlay.firstChild);
        }
        }, 500);
        
}

//Clear content content
function clearContent(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}