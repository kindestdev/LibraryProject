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
const book2 = new Book('JJK vol1','Gojo Satoru','1432','true')
const book3 = new Book('Boku No Hero','Midoriya almighty','1265','false')

const myLibrary = [book1,book2,book3];


function displayBooks(){
  const content = document.querySelector('.booksDisplay');
  while(content.firstChild)
  {content.removeChild(content.firstChild)}


  function ElementCreate(type,contenido,clase){
     
      this.el = document.createElement(type);
      this.el.textContent = contenido;
      this.el.classList.add(clase);
    
  }

  myLibrary.forEach((book,index)=>{
    const card = document.createElement('div');
    card.classList.add('card')

    const title = new ElementCreate('p',`Title: ${book.title}`,'title');

    const author = new ElementCreate('p',`Author: ${book.author}`,'author');

    const pages = new ElementCreate('p',`Pages: ${book.pages}`,'pages');

    const readInfo = new ElementCreate('p',`Read: ${book.read === 'true' ?'Yes' :'No'}`,'read')

    card.appendChild(title.el);card.appendChild(author.el);card.appendChild(pages.el);card.appendChild(readInfo.el);

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = 'Change Read Status';

    toggleButton.addEventListener('click',()=> {
      book.toggleReadStatus();

      readInfo.el.textContent = `Read: ${book.read ? 'Yes' : 'No'}`
    })

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove Book';

    removeButton.addEventListener('click', ()=>{
      myLibrary.splice(index,1);
      displayBooks()
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