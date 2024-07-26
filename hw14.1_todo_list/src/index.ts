// Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток. Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.
// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

enum StatusTodoListEnum {
  New = 'NEW',
  IsPerformed = 'IS PERFORMED',
  Executed = 'EXECUTED'
}

enum TypeOfTaskEnum {
  Default = 'DEFAULT',
  EditConfirm = 'EDIT CONFIRMATION'
}

interface ITodoTask {
  name: string;
  description: string;
  date: number;
  editing: boolean;
  status: StatusTodoListEnum;
  typeOfTask: TypeOfTaskEnum;
}

interface ITodoList {
  tasks: ITodoTask[];
}

class TodoList implements ITodoList {
  tasks: ITodoTask[] = [];

  constructor(tasks: ITodoTask[]) {
    this.tasks = tasks;
  }
}

