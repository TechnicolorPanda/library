render();

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
    console.log([myBook]);
    console.log(myBook.title);
    console.log(myBook.author);
    console.log(myBook.pages);
}

function render() {
    const content = document.createElement("div");
    content.classList.add("box");
    container.appendChild(content);
    for(var i = 0; i < 4; i++){ 
        var row = document.createElement("div"); 
        row.className = "row"; 
        for(var j = 1; j <=4; j++){ 
            var cell = document.createElement("div"); 
            cell.className = "gridsquare"; 
        }
        row.appendChild(cell); 
    }
        content.appendChild(row); 
}
