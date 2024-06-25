// 1. Створіть класи Circle, Rectangle, Square і Triangle. У кожного з них є загальнодоступний метод calculateArea. У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

abstract class Shape {
  constructor (private _color: string, private _name: string){}

  get color ():string {
    return this._color
  }

  get name ():string {
    return this._name
  }

  abstract calculateArea(): number;
}

class Circle extends Shape {

  constructor(
    color: string, 
    name: string, 
    private radius: number) {
      super(color, name);
  }

  public calculateArea(): number {
    return Math.PI * (this.radius ** 2);
  }
}

class Rectangle extends Shape {
  constructor(
    color: string, 
    name: string, 
    private width: number, 
    private height: number) {
      super(color, name);
  }

  public calculateArea(): number {
    return this.width * this.height;
  }

  print(): void {
    console.log("The area of rectangle is calculated by th formula: width * height");
  }
}

class Square extends Shape {
  constructor(
    color: string, 
    name: string, 
    private width: number) {
      super(color, name);
  }
  
  public calculateArea(): number {
    return Math.sqrt(this.width);
  }


  print(): void {
    console.log("The area of square is calculated by th formula: side * side");
  }
}

class Triangle extends Shape {
  constructor(
    color: string, 
    name: string, 
    private basic: number,
    private height: number
    ) {
      super(color, name);
    }
  
  
  public calculateArea(): number {
    return 0.5 * this.height * this.basic;
  }
}

const circle = new Circle("red", "Circle", 5);
const rectangle = new Rectangle("blue", "Rectangle", 4, 6);
const square = new Square("green", "Square", 3);
const triangle = new Triangle("yellow", "Triangle", 4, 7);

console.log(`${circle.name} (${circle.color}) - Area: ${circle.calculateArea()}`);
console.log(`${rectangle.name} (${rectangle.color}) - Area: ${rectangle.calculateArea()}`);
rectangle.print();
console.log(`${square.name} (${square.color}) - Area: ${square.calculateArea()}`);
square.print();
console.log(`${triangle.name} (${triangle.color}) - Area: ${triangle.calculateArea()}`);



