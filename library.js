(function () {
  const myLibrary = [];
  const mySavedLibrary = [];
  createHeading('Title', 'Author', 'Pages', 'Read');
  testLocalStorage(myLibrary, mySavedLibrary);
  submitSelection(myLibrary, mySavedLibrary);
})();

function createHeading() {
  const box = document.getElementById('box');
  const heading = document.getElementById('heading');
  const row = heading.insertRow(0);
  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('th');
    cell.innerHTML = arguments[i];
    row.appendChild(cell);
  }
  heading.appendChild(row);
  box.appendChild(heading);
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function submitSelection(myLibrary, mySavedLibrary) {
  console.log('submit selection');
  const submitButton = document.getElementById('submit');
  submitButton.innerHTML = 'Submit';
  submitButton.addEventListener('click', () => {
    console.log('click');
    addBookToLibrary(myLibrary, mySavedLibrary);
  });
  disableField();
}

// disable submit button when form is not completed

function disableField() {
  const invalidForm = document.querySelector('input:invalid');
  const submitButton = document.getElementById('submit');
  if (invalidForm) {
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.removeAttribute('disabled');
    console.log('remove attribute');
    //submitButton.disabled = false;
  }

  const inputs = document.getElementsByTagName('input');
  for (const input of inputs) {
    input.addEventListener('change', disableField);
  }
}

function addBookToLibrary(myLibrary, mySavedLibrary) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;
  const myBook = new Book(title, author, pages, read);

  myLibrary.push(myBook);

  myLibrary.forEach((element) => (mySavedLibrary = element));

  localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));

  clearTable();
  renderBooks(myLibrary, mySavedLibrary);
}

function renderBooks(myLibrary, mySavedLibrary) {
  myLibrary.forEach((element) =>
    render(element.title, element.author, element.pages, element.read));

  function render() {
    const box = document.getElementById('box');
    const table = document.getElementById('bookTable');
    const row = table.insertRow(0);
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('td');
      cell.innerHTML = arguments[j];
      row.appendChild(cell);
    }

    // create read checkbox on table

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute(
      'style',
      'height: 20px; width: 20px; margin-top: 25px;',
    );

    if (arguments[3] === 'yes') {
      checkbox.checked = true;
      row.appendChild(checkbox);
    } else {
      checkbox.checked = false;
      row.appendChild(checkbox);
    }
    checkbox.value = arguments[0];

    // change read status in list

    checkbox.addEventListener(
      'click',
      () => {
        for (let i = myLibrary.length - 1; i >= 0; i--) {
          if (myLibrary[i].title === checkbox.value) {
            if (checkbox.checked === false) {
              myLibrary[i].read = 'no';
            } else {
              myLibrary[i].read = 'yes';
            }
          }
        }

        myLibrary.forEach((element) => (mySavedLibrary = element));
        localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));

        clearTable();
        myLibrary.forEach((element) => render(element.title, element.author, element.pages, element.read));
      },
      false,
    );
  
    // add remove button

    const button = document.createElement('button');
    button.innerHTML = 'remove';
    button.value = arguments[0];
    row.appendChild(button);
    removeBook(button, myLibrary, mySavedLibrary);
    table.appendChild(row);
    box.appendChild(table);
  }
}

// erases book table

function clearTable() {
  const table = document.getElementById('bookTable');
  table.innerHTML = '';
}

// removes book from list when button selected

function removeBook(button, myLibrary, mySavedLibrary) {
  button.addEventListener(
    'click',
    () => {
      for (let i = myLibrary.length - 1; i >= 0; i--) {
        if (myLibrary[i].title === button.value) myLibrary.splice(i, 1);
      }
      myLibrary.forEach((element) => (mySavedLibrary = element));
      localStorage.setItem('mySavedLibrary', JSON.stringify(myLibrary));
      clearTable();
      renderBooks(myLibrary, mySavedLibrary);
    },
    false,
  );
}

// directs storage options

function testLocalStorage(myLibrary, mySavedLibrary) {
  if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('mySavedLibrary')) {
      populateStorage(mySavedLibrary);
    } else {
      retrieveStorage(myLibrary);
    }
  } else {
    alert('Library can not be saved.');
  }
}

// checks to see if local storage is allowed

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      && (e.code === 22
        || e.code === 1014
        || e.name === 'QuotaExceededError'
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && storage
      && storage.length !== 0
    );
  }
}

// creates local storage for the first time

function populateStorage(mySavedLibrary) {
  localStorage.setItem('mySavedLibrary', mySavedLibrary);
}

// retrieves existing local storage

function retrieveStorage(myLibrary) {
  const mySavedLibrary = JSON.parse(localStorage.getItem('mySavedLibrary'));
  mySavedLibrary.forEach((element) => myLibrary.push(element));
  clearTable();
  renderBooks(myLibrary, mySavedLibrary);
}