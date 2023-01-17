//Create contact page
function createContact(){
    let contactPage = document.createElement('div');
    contactPage.className = "contactPage";

    let contact = document.createElement('div');
    contact.className = "contact";

    let title = document.createElement('span');
    title.className = "contactTitle"
    title.innerText = "Contacts";

    let form = document.createElement('form');

    //First name input field
    let fNL = document.createElement('label');
    fNL.setAttribute("for","fname");
    fNL.innerText = "First name"
    let fN = document.createElement('input');
    fN.setAttribute("type", "text");
    fN.setAttribute("id", "fname");
    fN.setAttribute("placeholder", "First");
    fN.required = true;

    //Last name input field
    let lNL = document.createElement('label');
    lNL.setAttribute("for","lname");
    lNL.innerText = "Last name"
    let lN = document.createElement('input');
    lN.setAttribute("type", "text");
    lN.setAttribute("id", "lname");
    lN.setAttribute("placeholder", "Last");
    lN.required = true;

    //Email input field
    let mL = document.createElement('label');
    mL.setAttribute("for","mail");
    mL.innerText = "Email"
    let mail = document.createElement('input');
    mail.setAttribute("type", "email");
    mail.required = true;

    //Submit input field
    let sub = document.createElement('input')
    sub.setAttribute("type", "submit");

    form.appendChild(fNL);
    form.appendChild(fN);
    form.appendChild(lNL);
    form.appendChild(lN);
    form.appendChild(mL);
    form.appendChild(mail);
    form.appendChild(sub);

    contact.appendChild(title);
    contact.appendChild(form);

    //Location map div
    let location = document.createElement('div');
    location.className = "locationMap"
    let map = document.createElement('div');
    map.id = "map";

    location.appendChild(map);

    createMap(map);

    contactPage.appendChild(contact);
    contactPage.appendChild(location);

    //animate dynamically created page
    requestAnimationFrame(()=>{
        contactPage.style.opacity = 1;
    })

    return contactPage
}


function createMap(inputMap){
    let tokyo = {lat:35.68064724779705, lng:139.7672043445679};
    let map = new google.maps.Map(inputMap, {
        zoom: 15,
        center: tokyo,
      });
    // The marker, positioned at Tokyo
    let marker = new google.maps.Marker({
        position: tokyo,
        map: map,
    });
}

export default createContact;