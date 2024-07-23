// ДЗ, Узагальнення

// Фільтрація масиву
// Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив елементів на основі наданої умови.

function filterArray<T>(array: T[], condition: (value: T) => boolean): T[] {
   return array.filter(condition)
}

const numbers = [1, 2, 3, 4, 5, 6];
const filterNumbers = filterArray(numbers, num => num %2 === 0);
console.log(filterNumbers)


// Узагальнений стек
// Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.
class Stack<T> {
   public array: T[] = [];
   
   public push(item: T): void {
      this.array.push(item)
   };

   public pop(): T | undefined {
      return this.array.pop()
   }
   
   public peek(): T | undefined {
      return this.array[this.array.length - 1]
   }
}

const numbersStack = new Stack<number>();
numbersStack.push(1); // [1]
numbersStack.push(2); // [1, 2]
numbersStack.peek(); // 2
numbersStack.pop(); // 2

// Узагальнений словник
// Створіть узагальнений клас Dictionary, який являє собою словник (асоціативний масив) з методами set, get і has. Обмежте ключі тільки валідними типами для об'єкта.

class Dictionary<TKey extends string, TValue> {
   public item: {[key in TKey]?: TValue} = {}
   
   set(key: TKey, value: TValue): void {
      this.item[key] = value;
   };
   
   get(key: TKey): TValue | undefined {
      return this.item[key]
   };
   
   has(key: TKey): boolean{
      return key in this.item;
   }
}

const dictionary = new Dictionary<string, string>();
dictionary.set("one", "один");
dictionary.set("two", "два");
console.log(dictionary.get("one")); // "один"
console.log(dictionary.has("two")); // true

