// Вам необхідно написати додаток Todo list. 
//У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток. 
//Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. 
//Нотатки не повинні бути порожніми.
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
  id: number;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited?: Date | null;
  editing: boolean;
  status: StatusTodoListEnum;
  typeOfTask: TypeOfTaskEnum;
}

interface ITodoList {
  addNewTask(task: ITodoTask): void;
  removeTask(taskId: number): void;
  editingTask(taskId: number, updatedTask: Partial<ITodoTask>): void;
  getInformationTask(taskId: number): ITodoTask | undefined;
  getAllOfTasks(): ITodoTask[];
  getTotalTasksCount(): number;
  markTaskAsExecuted(taskId: number): void;
  getExecutedTaskCount(): number;
  getTotalTasksCount(): number;
  searchTasks(query: string): ITodoTask[];
  sortTasks(by: 'status' | 'dateCreated'): ITodoTask[]
}

class TodoList implements ITodoList {
  private tasks: ITodoTask[] = [];
  private nextId: number = 1;

  
  //Add a new task
  public addNewTask(task: ITodoTask): void {
    task.id = this.nextId++;
    task.dateCreated = new Date();
    task.dateEdited = null;
    this.tasks.push(task)
  };
  
  //Remove a task
  public removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(item => item.id !== taskId)
  };

  // Editing a task  
  public editingTask(taskId: number, updatedTask: Partial<ITodoTask>): void {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      if (task.typeOfTask === TypeOfTaskEnum.EditConfirm) {
        task.editing = true;
      }
      Object.assign(task, updatedTask);
      task.dateEdited = new Date();
      task.editing = false;
    }
  };

  // Get all of information about some task  
  public getInformationTask(taskId: number): ITodoTask | undefined {
    return this.tasks.find(task => task.id === taskId);
  };
  
  // Get all of tasks
  public getAllOfTasks(): ITodoTask[] {
    return this.tasks;
  };

  //Mark a task as executed
  public markTaskAsExecuted(taskId: number): void {
    const task = this.tasks.find(task => task.id === taskId);
    if(task) {
      task.status = StatusTodoListEnum.Executed;
    }
  }

  //Count all of executed tasks
  public getExecutedTaskCount(): number{
    return this.tasks.filter(task => task.status !== StatusTodoListEnum.Executed).length;
  }

  //Count all of tasks
  public getTotalTasksCount(): number {
    return this.tasks.length;
  }

  //Search tasks by name and description
  public searchTasks(query: string): ITodoTask[] {
    return this.tasks.filter(task =>
      task.name.includes(query) || task.description.includes(query)
    );
  }

  // Sort tasks by Status and created date
  public sortTasks(by: 'status' | 'dateCreated'): ITodoTask[] {
    return this.tasks.sort((a, b) => {
      if (by === 'status') {
        return a.status.localeCompare(b.status);
      } else if (by === 'dateCreated') {
        return a.dateCreated.getTime() - b.dateCreated.getTime();
      }
      return 0;
    });
  }
}

const todoList = new TodoList();

const task1: ITodoTask = {
  id: 0,
  name: "Task 1",
  description: "Description 1",
  dateCreated: new Date('2024-05-01'),
  dateEdited: null,
  editing: false,
  status: StatusTodoListEnum.New,
  typeOfTask: TypeOfTaskEnum.Default
};

const task2: ITodoTask = {
  id: 0,
  name: "Task 2",
  description: "Description 2",
  dateCreated: new Date('2024-02-01'),
  dateEdited: null,
  editing: false,
  status: StatusTodoListEnum.Executed,
  typeOfTask: TypeOfTaskEnum.EditConfirm
};

const task3: ITodoTask = {
  id: 0,
  name: "Task 3",
  description: "Description 3",
  dateCreated: new Date('2024-01-15'),
  dateEdited: null,
  editing: false,
  status: StatusTodoListEnum.IsPerformed,
  typeOfTask: TypeOfTaskEnum.Default
};

todoList.addNewTask(task1);
todoList.addNewTask(task2);
todoList.addNewTask(task3);

console.log(todoList.getAllOfTasks());

todoList.removeTask(task2.id);

// Edit a task
const updatedTask1: Partial<ITodoTask> = {
  name: "Updated Task 1",
  description: "Updated Description 1",
  status: StatusTodoListEnum.IsPerformed
};

todoList.editingTask(task1.id, updatedTask1);

const taskInfo = todoList.getInformationTask(task1.id);
console.log(taskInfo);

todoList.markTaskAsExecuted(task3.id);

const executedTasksCount = todoList.getExecutedTaskCount();
console.log(executedTasksCount);

const searchResults = todoList.searchTasks("Updated");
console.log(searchResults);

const sortedByStatus = todoList.sortTasks('status');
console.log(sortedByStatus);

const sortedByDate = todoList.sortTasks('dateCreated');
console.log(sortedByDate);



