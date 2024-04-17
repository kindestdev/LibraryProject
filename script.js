const addButton = document.querySelector('.add');
const modal = document.querySelector('.modal')

addButton.addEventListener('click',()=>{
  modal.showModal();
})

function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

const book1 = new Book('Naruto','Nishito nosq','1923','false')
const book2 = new Book('JJK vol1','Gojo Satoru','1432','false')
const book3 = new Book('Boku No Hero','Midoriya almighty','1265','false')


const myLibrary = [book1,book2,book3];



function displayBooks(){
  const content = document.querySelector('.booksDisplay');
  while(content.firstChild)
  {content.removeChild(content.firstChild)}

  myLibrary.forEach((book,index)=>{
    const card = document.createElement('div');
    card.classList.add('card')

    const title = document.createElement('p');
    title.classList.add('cardTitle');
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement('p');
    author.classList.add('cardAuthor');
    author.textContent = 'Author: ' + book.author;
    card.appendChild(author);

    const pages = document.createElement('p');
    pages.classList.add('cardPages');
    pages.textContent = 'Pages: ' + book.pages;
    card.appendChild(pages);

    const readInfo = document.createElement('p');
    readInfo.classList.add('cardReadInfo');
    readInfo.textContent = `Read: ${book.read === 'true' ? 'Yes' : 'No'}`
    card.appendChild(readInfo);

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = 'Change Read Status';

    toggleButton.addEventListener('click',()=> {
      book.toggleReadStatus();

      readInfo.textContent = `Read: ${book.read ? 'Yes' : 'No'}`
    })


    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove Book';

    removeButton.addEventListener('click', ()=>{
      myLibrary.splice(index,1);
      displayBooks()
      // i think might be missing here
    })

    card.appendChild(toggleButton);
    card.appendChild(removeButton);
    content.appendChild(card);

    
    
  })}

  document.querySelector('#bookForm').addEventListener('submit',function (event) {
    event.preventDefault();

    const inputTitle = document.getElementById('title').value;
    const inputAuthor = document.getElementById('author').value;
    const inputPages = document.getElementById('pages').value;
    const inputRead = document.getElementById('read').checked;

    if(inputTitle === '' || inputAuthor === '' || inputPages === ''){
      alert('All fields must be complete')
    }else {

    const newBook = new Book(inputTitle,inputAuthor,inputPages,inputRead)

    myLibrary.push(newBook)
    displayBooks()

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

    modal.close()
    }
  })

  displayBooks()

  function limitLength(element, maxLength) {
    if (element.value.length > maxLength) {
      element.value = element.value.slice(0, maxLength);
    }
  }