// 1. Створіть інтерфейс, який описує структуру об'єкта, що представляє калькулятор. Калькулятор повинен мати методи для виконання арифметичних операцій: додавання, віднімання, множення та ділення. Потім створіть функцію calculate, яка приймає об'єкт цього типу та виконує операцію і повертає результат.

interface ICalculator {
  num1: number;
  num2: number;
  add(): number;
  subtract(): number;
  multiply(): number;
  divide(): number | string;
}

function calculate(calculator: ICalculator, operation: string): number | string {
  switch (operation) {
    case 'add':
      return calculator.add();
    case 'subtract':
      return calculator.subtract();
    case 'multiply':
      return calculator.multiply();
    case 'divide':
      return calculator.divide();
    default:
      return "Error: Unknown operation!";
  }
}

class Calculator1 implements ICalculator {
  num1: number;
  num2: number;

  constructor (num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }

  add(): number {
    return this.num1 + this.num2;
  }

  subtract(): number {
    return this.num1 - this.num2;
  }
  
  multiply(): number {
    return this.num1 * this.num2;
  }

  divide(): number | string {
    if (this.num2 != 0){
      return this.num1 / this.num2;
    } else {
      return "Error: division by zero!";
    }
  }
}

const calc1: ICalculator = new Calculator1(6, 2); // 
const calc2: ICalculator = new Calculator1(12, 2);

console.log(calculate(calc1, "add")); 
console.log(calculate(calc1, "subtract")); 
console.log(calculate(calc1, "multiply")); 
console.log(calculate(calc1, "divide")); 

console.log(calculate(calc2, "add")); 
console.log(calculate(calc2, "subtract")); 
console.log(calculate(calc2, "multiply")); 
console.log(calculate(calc2, "divide"));  



// 2. Уявіть, що ви створюєте інтерфейси для веб-сервісу, який надає інформацію про книги. Створіть інтерфейси Book, Author, і BookService, які описують структуру даних книжок, авторів і методи веб-сервісу для отримання інформації про книжки та авторів. Потім створіть об'єкт bookService, який імітує роботу веб-сервісу, і використовуйте інтерфейси для отримання інформації про книги та авторів.

interface IBook {
  id: number;
  title: string;
  authorId: number;
  year: number;
  available: boolean;
}

interface IAuthor {
  id: number;
  name: string;
}

interface IBookService {
  getBookById(id: number): IBook | undefined;
  getBooksByAuthorId(authorId: number): IBook[];
  getAvailableBook(available: boolean): IBook[];
  getAuthorById(id: number): IAuthor | undefined;
  getAllBooks(): IBook[];
  getAllAuthors(): IAuthor[];
}

const bookService: IBookService & { books: IBook[], authors: IAuthor[] } = {
  // data of books
  books: [
    { id: 1, title: 'Book One', authorId: 1, year: 2012, available: true },
    { id: 2, title: 'Book Two', authorId: 2, year: 2005, available: false },
    { id: 3, title: 'Book Three', authorId: 1, year: 2022, available: true },
  ],

  // data of authors
  authors: [
    { id: 1, name: 'Author One' },
    { id: 2, name: 'Author Two' },
  ],

  // get book by id
  getBookById(id: number): IBook {
    return this.books.find((book: { id: number }) => book.id === id);
  },

  // get books by author id
  getBooksByAuthorId(authorId: number): IBook[] {
    return this.books.filter((book: { authorId: number; }) => book.authorId === authorId);
  },

  // get available books
  getAvailableBook(available: boolean): IBook[] {
    return this.books.filter((book: { available: boolean; }) => book.available === available);
  },

  // get author by id
  getAuthorById(id: number): IAuthor | undefined {
    return this.authors.find((author: { id: number; }) => author.id === id);
  },

  // get all books
  getAllBooks(): IBook[] {
    return this.books;
  },

  // get all authors
  getAllAuthors(): IAuthor[] {
    return this.authors;
  }
};

// Example usage:
console.log(bookService.getBookById(1));
console.log(bookService.getBooksByAuthorId(1));
console.log(bookService.getAvailableBook(true));
console.log(bookService.getAuthorById(1));
console.log(bookService.getAllBooks());
console.log(bookService.getAllAuthors());