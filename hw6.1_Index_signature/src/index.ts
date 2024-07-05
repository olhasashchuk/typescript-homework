// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
interface IIdentifierNumStr {
   [key: string]: number | string;
}

const example1 = {
   name: 'Peter',
   age: 30
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.

interface IIdentifierFunc {
   [key: string]: (...args: any[]) => any;
}

const example2: IIdentifierFunc = {
   greet: (name: string) => `Hello ${name}!`
}


// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.

interface IIdentifierArray<T> {
   [key: number]: T;
}

const example3: IIdentifierArray<string> = ['Peter', 'Anna', 'Henrik']

// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface IIdentifierPerson {
   name: string;
   [key: string]: number | string;
}

const example4: IIdentifierPerson = {
   name: 'Peter',
   age: 30
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface IIdentifierFirst {
   [key: string]: number | string | boolean;
}

interface IIdentifierSecond extends IIdentifierFirst  {
   inAvailable: boolean;
}

const example5: IIdentifierSecond  = {
   name: 'Peter',
   age: 30,
   inAvailable: true
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).

interface IIdentifierNum {
   [key: string]: number;
}

function checkType (obj: IIdentifierNum): boolean {
   return Object.values(obj).every(value => typeof value === 'number')
}

const example6: IIdentifierNum  = {
   a: 1,
   b: 2,
   c: 3
}

checkType(example6) //true