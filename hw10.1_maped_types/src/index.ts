 interface Person {
   name?: string;
   age?: number;
   location?: Address;
 }
 
 interface Address {
   country: string;
   city?: string;
   street?: string;
 }
 
//Створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

type DeepReadonly<T> = {
   readonly [P in keyof T]: DeepReadonly<T[P]>;
 };

 type ReadonlyPerson = DeepReadonly<Person>;
 
 const example1: ReadonlyPerson = {
   name: "John",
   age: 32,
   location: {
     country: 'USA',
     city: 'NY',
     street: "123 Main St"
   }
 };
 
  //example1.name = "Jane"; // error
  //example1.location.city = 'Los Angeles'; // error

  
 // Створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

 type DeepRequireReadonly<T> = {
   readonly [P in keyof T]-?: DeepRequireReadonly<T[P]>;
 };
 
 type RequiredReadonlyPerson = DeepRequireReadonly<Person>;
 
 const example2: RequiredReadonlyPerson = {
   name: "John",
   age: 32,
   location: {
      country: 'USA',
      city: 'NY',
      street: "123 Main St"
   }
 };
 

 // Створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.

 type UpperCaseKeys<T> = {
   [K in keyof T as Uppercase<K & string>]: UpperCaseKeys<T[K]>;
 };

 type UpperCaseKeysPerson = UpperCaseKeys<Person>

 const example3: UpperCaseKeysPerson = {
   NAME: "John",
   AGE: 32,
   LOCATION: {
      COUNTRY: 'USA',
      CITY: 'NY',
      STREET: "123 Main St"
   }
 };

//Створити тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

interface User {
   name: string;
   age: number;
 };
 
 type PropertyDescriptor1 = {
   value?: any;
   writable?: boolean;
   enumerable?: boolean;
   configurable?: boolean;
}

 type ObjectToPropertyDescriptor<T> = {
   [K in keyof T]: PropertyDescriptor1;
 };

 type DescriptorsUser = ObjectToPropertyDescriptor<User>;
 
 const example4: DescriptorsUser = {
   name: {
     value: 'John',
     writable: false,
     enumerable: true,
     configurable: true,
   },
   age: {
     value: 25,
     writable: false,
     enumerable: true,
     configurable: false,
   }
 }