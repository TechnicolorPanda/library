
function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    //this.read = read
}

function haveRead() {
    let checkbox = document.querySelector("form");
    checkbox.addEventListener("change", function() {
        let read = checkbox.checked ? true : false;
        console.log(read);
    });
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    const myBook = new Book (title, author, pages);
    console.log(myBook.title);
    console.log(myBook.author);
    console.log(myBook.pages);
    render(myBook.title, myBook.author, myBook.pages);
}

function render() {
    let x = 1;
    const box = document.getElementById("box");
    const table = document.createElement("table");
    const tableBody = document.createElement("tableBody");
    let row = table.insertRow(0);
    //for(let i = 0; i < x; i++){ 
        //let row = document.createElement("tr");
        //insertRow
        for(let j = 0; j < 3; j++){ 
            let cell = document.createElement("td");
            cell.innerHTML = (arguments[j]);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    //}
        table.appendChild(tableBody); 
        box.appendChild(table);
        table.setAttribute("border", "2");
}


