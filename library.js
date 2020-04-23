let myLibrary = [];
createHeading("Title", "Author", "Pages", "Read");
testLocalStorage();

function createHeading() {
    const box = document.getElementById("box");
    const heading = document.getElementById("heading");
    let row = heading.insertRow(0);
        for(let i = 0; i < 4; i++){ 
            let cell = document.createElement("th");
            cell.innerHTML = (arguments[i]);
            row.appendChild(cell);
        }
    heading.appendChild(row);
    box.appendChild(heading);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    const myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
    //myLibrary.forEach(element => 
        //render(element.title, element.author, element.pages, element.read));
    myLibrary.forEach(element => 
        mySavedLibrary = JSON.stringify(element.title + "," + element.author + "," + element.pages + "," + element.read));
        localStorage.setItem("mySavedLibrary", mySavedLibrary);
    clearTable();
    myLibrary.forEach(element => 
        render(element.title, element.author, element.pages, element.read));
}

function render() {
    const box = document.getElementById("box");
    const table = document.getElementById("bookTable");
    let row = table.insertRow(0);
        for(let j = 0; j < 3; j++){ 
            let cell = document.createElement("td");
            cell.innerHTML = (arguments[j]);
            row.appendChild(cell);
        }

    //create read checkbox on table

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    if (arguments[3] === "yes"){
        checkbox.checked = true;
        row.appendChild(checkbox);
    } else {
        checkbox.checked = false;
        row.appendChild(checkbox);
    }
    const button = document.createElement("button");
    button.innerHTML = "remove";
    button.value =  arguments[0];
    row.appendChild(button);
    removeBook(button);
    table.appendChild(row);
    box.appendChild(table);
}

function clearTable() {
    let table = document.getElementById("bookTable");
    table.innerHTML = "";
}

function removeBook(button) {
    button.addEventListener("click", function() {
        for (let i = myLibrary.length-1; i>=0; i--) {
            if (myLibrary[i].title === button.value)
                myLibrary.splice(i,1);
        }
        clearTable();
        myLibrary.forEach(element => 
            render(element.title, element.author, element.pages, element.read));
        }, false);
}

//saves data to local storage

function testLocalStorage() {
    //let localStorateExists = true;
    if (storageAvailable("localStorage")) {
        if(!localStorage.getItem("mySavedLibrary")) {
            console.log("Populate storage");
            populateStorage();
          } else {
            console.log("Retrieve storage");
            retrieveStorage();
          }
      }
      else {
        //let localStorageExists = false;
        console.log("Library can not be saved.")
      }
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

function populateStorage() {
        //myLibrary =[]
        let storageLength = localStorage.length;
        for(i=0; i<storageLength+1; i++){
            const arr = ["Harry Potter", "JK Rowlings", "343","yes"];
            myLibrary[i] = new Book(arr[0],arr[1],arr[2],arr[3]);
        }

        myLibrary.forEach(element => 
            mySavedLibrary = JSON.stringify(element.title + "," + element.author + "," + element.pages + "," + element.read));
            localStorage.setItem("mySavedLibrary", mySavedLibrary);
            clearTable();
}

function retrieveStorage() {
    let libraryLength = localStorage.length;
    for(i=0; i<libraryLength; i++){
        const arr = localStorage.getItem("mySavedLibrary").split(",");
        myLibrary[i] = new Book(arr[0],arr[1],arr[2],arr[3])
        console.table(myLibrary);
    }
    myLibrary.forEach(element => 
        render(element.title, element.author, element.pages, element.read));
}


