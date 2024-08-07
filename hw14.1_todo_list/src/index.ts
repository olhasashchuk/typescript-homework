// Вам необхідно написати додаток Todo list. 
//У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток. 
//Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. 
//Нотатки не повинні бути порожніми.
// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

type Uuid = number;

enum StatusTodoListEnum {
  New = 'NEW',
  IsPerformed = 'IS PERFORMED',
  Executed = 'EXECUTED'
}

interface ITodoTask {
  id: Uuid;
  name: string;
  description: string;
  dateCreated: Date;
  dateEdited?: Date | null;
  status: StatusTodoListEnum;
  editingTask: (payload: ITodoTaskUpdated, confirm?: boolean) => void;
  markTaskAsExecuted(): void;
}

interface ITodoTaskUpdated {
  name?: ITodoTask['name'];
  description?: ITodoTask['description'];
}

interface ITodoList {
  addNewTask: (name: string, description: string) => void;
  removeTask: (taskId: Uuid) => ITodoTask;
  editingTask: (taskId: Uuid, payload: ITodoTaskUpdated, confirm?: boolean) => ITodoTask;
  getInformationTask: (taskId: Uuid) => ITodoTask | undefined;
  getAllOfTasks: () => ITodoTask[];
  getTotalTasksCount: () => number;
  getExecutedTaskCount(): number;
}

interface ISearchable {
  searchByName: (name: string) => ITodoTask[];
  searchByDescription: (description: string) => ITodoTask[];
}

interface ISortable {
  sortByStatus: (status: StatusTodoListEnum) =>  ITodoTask[];
  sortByDateCreated: () =>  ITodoTask[];
}

abstract class BaseTodoTask implements ITodoTask {
  readonly id: Uuid = Math.random() * (100 - 0) + 0;
  readonly dateCreated = new Date();

  dateEdited?: Date | null = null;
  status = StatusTodoListEnum.New;
  
  constructor(public name: string, public description: string) {}
  
  public abstract editingTask({ name, description }: ITodoTaskUpdated, confirm?: boolean): void;

  public markTaskAsExecuted(): void {
    this.status = StatusTodoListEnum.Executed;
  }
}

class TodoTask extends BaseTodoTask {
  public override editingTask({ name, description }: ITodoTaskUpdated): void {
    if (name?.trim()) {
      this.name = name;
    }
    if (description?.trim()) {
      this.description = description;
    }

    this.dateEdited = new Date();
  };
}
class TodoTaskConfirmed extends BaseTodoTask {
  public override editingTask({ name, description }: ITodoTaskUpdated, confirm: boolean = false): void {
    if (!confirm) {
      throw new Error("Editing requires confirmation");
    }
    if (name?.trim()) {
      this.name = name;
    }
    if (description?.trim()) {
      this.description = description;
    }

    this.dateEdited = new Date();
  }
}

class TodoList implements ITodoList {
  private tasks: ITodoTask[] = [];
 
  //Add a new task
  public addNewTask(name: string, description: string): void {
    if(!name.trim() || !description.trim()) {
      throw new Error("Note can't be empty")
    }
    const task = new TodoTask(name, description);
    this.tasks.push(task);
  };
  
  //Remove a task
  public removeTask(taskId: Uuid): ITodoTask {
    const taskIndex = this.findByIndex(taskId);
    if(~~taskIndex){
      throw new Error(`${taskId} isn't defined`)
    }
    const [removedTask] = this.tasks.splice(taskIndex, 1);
    return removedTask;
  };

  // Editing a task  
  public editingTask(taskId: Uuid, payload: ITodoTaskUpdated, confirm: boolean = false): ITodoTask {
    const taskIndex = this.findByIndex(taskId);
    const task = this.tasks[taskIndex];
    const oldTask = { ... task };
    task.editingTask(payload, confirm);
    return oldTask;
  };

  private findByIndex(taskId: Uuid): number {
    const taskIndex = this.tasks.findIndex((item) => (item.id = taskId));
    if(~~taskIndex){
      throw new Error(`${taskId} isn't defined`)
    }
    return taskIndex; 
  }

  // Get all of information about some task  
  public getInformationTask(taskId: number): ITodoTask {
    const task = this.tasks[this.findByIndex(taskId)]
    return task;
  };
  
  // Get all of tasks
  public getAllOfTasks(): ITodoTask[] {
    return this.tasks;
  };

  //Mark a task as executed
  public markTaskAsExecuted(taskId: number): void {
    const task = this.tasks[this.findByIndex(taskId)];
    task.markTaskAsExecuted();
  }

  //Count all of executed tasks
  public getExecutedTaskCount(): number{
    return this.tasks.filter(task => task.status === StatusTodoListEnum.Executed).length;
  }

  //Count all of tasks
  public getTotalTasksCount(): number {
    return this.tasks.length;
  }
}

class TodoListSearch extends TodoList implements ISearchable {
  public searchByDescription (description: string): ITodoTask[] {
    return this.getAllOfTasks().filter(task => task.description === description);
  };
  public searchByName (name: string): ITodoTask[] {
    return this.getAllOfTasks().filter(task => task.name === name);
  }
}

class TodoListSort extends TodoList implements ISortable {
  public sortByStatus (status: StatusTodoListEnum): ITodoTask[] {
    return this.getAllOfTasks().filter(task => task.status === status);
  };
  public sortByDateCreated(): ITodoTask[] {
    return this.getAllOfTasks().sort((a, b) => a.dateCreated.getTime() - b.dateCreated.getTime());
  };
}

