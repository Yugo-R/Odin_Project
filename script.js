const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const modalAddBook = document.querySelector('[data-modal-book]');
const cardContainer = document.getElementById('container');
let myLibrary = [];

//modal event ----------------------------------------------------------------
openModalButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        let modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal);
    })
})

closeModalButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        let modal = document.querySelector(button.dataset.closeButton)
        closeModal(modal);
    })
})

overlay.addEventListener('click', () => {
    let modal = document.querySelector('.modalBook')
    let modaltwo = document.querySelector('.modalFolder')
    if(modal.classList.contains('active')){
        closeModal(modal);
    }
    else{
        closeModal(modaltwo);
    }
})

function openModal(modal){
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    modalAddBook.reset();
}
// ----------------------------------------------------------------------------

//When the page load, check local storage for book library data
window.onload = function(){
    //If nothing in localstorage do nothing.
    if(!JSON.parse(localStorage.getItem("myLibrary"))){
        return;
    }
    //Else update the page using book library data 
    else{
        myLibrary = [...JSON.parse(localStorage.getItem("myLibrary"))];
        for(let book of myLibrary){
            addBookToLibrary(book);
        }
    }
}

// On modal submit
modalAddBook.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    //Get value from the form
    let title = document.getElementById('bookTitle').value
    let author = document.getElementById('bookAuthor').value
    let page = document.getElementById('page').value
    let readed = document.getElementById('bookRead').checked;
    let newBook = new Book(title,author,page,readed);

    //Check if book already exist in the library
    for(book of myLibrary){
        if(newBook.title == book.title){
            alert(`Book with the name of '${newBook.title}' already exist in the library. Please try again.`);
            return;
        }
    }
    
    //Add book to the library array and display it on the screen
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
    
    //Save them in the local storage
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
});

// the constructor...
// function Book(title,author,page,read) {
//   this.title = title;
//   this.author = author;
//   this.page = page + ' pages';
//   this.read = read;
// }
class Book{
    constructor(title,author,page,read){
        this.title = title;
        this.author = author;
        this .page = page + ' pages';
        this.read = read;
    }
}

//Create book card and display on screen
function addBookToLibrary(newBook) {
    //Create conponnent of a book card
    let cardBody = document.createElement('div');
    cardBody.className = 'card'
    cardBody.id = `card${myLibrary.length - 1}`;

    let cardHead = document.createElement('div');
    cardHead.className = 'cardHead'

    let cardTail = document.createElement('div');
    cardTail.className = 'cardTail'

    //Create h2 from book obj and append to cardHead but read value;
    for(key in newBook){
        if(key === 'read'){
            continue
        }
        else{
            let newText = document.createElement('h2');
            newText.textContent = newBook[key];
            cardHead.appendChild(newText);
        }  
    }

    //Create two button and append to cardTail
    let editBtn = document.createElement('button');
    editBtn.className = 'readCheck';
    editBtn.textContent = newBook.read? 'Readed':'Not readed';
    editBtn.style.backgroundColor = newBook.read? 'green':'red';
    editBtn.dataset.card = '#' + cardBody.id;
    editBtn.dataset.read = newBook.title;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteCard';
    deleteBtn.textContent = 'Delete';
    //Set data attribute of button to the specific card id and title name so we can delete from the dom and array easily
    deleteBtn.dataset.card = '#' + cardBody.id;
    deleteBtn.dataset.title = newBook.title;

    cardTail.appendChild(editBtn);
    cardTail.appendChild(deleteBtn);

    //Append card head and tail to card
    cardBody.appendChild(cardHead);
    cardBody.appendChild(cardTail);
    //Append the card to the container
    cardContainer.appendChild(cardBody);

    //close modal
    let modal = document.querySelector('.modalBook')
    closeModal(modal);
}

//When click read button or delete button
cardContainer.addEventListener('click', (e) =>{
        //If delete button
        if(e.target.className == 'deleteCard'){
            document.querySelector(e.target.dataset.card).remove();
            //Remove book from array
            pos = myLibrary.findIndex(ele => ele.title == e.target.dataset.title);
            myLibrary.splice(e.target.dataset.index,1);
            //Local storage equal to modified array
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        }
        //If read button
        else if(e.target.className == 'readCheck'){
            //Change boolean of .read according to the user input.
            if(e.target.innerText == 'Readed'){
                e.target.innerText = 'Not Readed';
                e.target.style.backgroundColor = 'red';
                for(ele of myLibrary){
                    if(ele.title == e.target.dataset.read){
                        ele.read = false;
                        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                    }
                }
            }
            else{
                e.target.innerText = 'Readed';
                e.target.style.backgroundColor = 'green';
                for(let ele of myLibrary){
                    if(ele.title == e.target.dataset.read){
                        ele.read = true;
                        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                    }
                }
            }
        }
})

