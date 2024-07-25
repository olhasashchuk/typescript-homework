// ДЗ Захисники типів.

// У вас є сутність - Компанія, яка має назву, список департаментів, список попередньо найнятого персоналу, а також список усього персоналу компанії - співробітники всіх департаментів і попередньо найняті.

// Сутність Департамент - має назву, доменну область, список своїх співробітників і бюджет, що складається з дебіту і кредиту. Так само у неї існують методи для обчислення балансу виходячи з поточного бюджету, додавання нових співробітників, який враховує зміни балансу і перетворення з Попередньо найнятого на Співробітника або видалення Співробітника з минулого відділу.

// Сутність Попередньо найнятого співробітника має ім'я, прізвище, зарплата та номер банківського рахунку.

// Сутність Співробітника - ім'я, прізвище, платіжну інформацію, зарплату, статус (активний, неактивний, у неоплачуваній відпустці) і знання про департамент, до якого він прикріплений.

// Так само у нас є сутність Бухгалтерія, яка є департаментом і має властивість баланс, а також методи для взяття на баланс співробітника або департаменту, зняття з балансу і виплати зарплати для всього персоналу.

// Попередньо найняті співробітники отримують зарплату за допомогою зовнішніх оплат, Співробітники (тільки активні) - за допомогою внутрішніх.

enum EmployeeStatus {
  Active = 'active',
  Inactive = 'inactive',
  UnpaidLeave = 'unpaid leave'
}
interface IPreHiredEmployees {
  firstName: string;
  lastName: string;
  salary: number;
  bankAccount: number;
};

interface IEmployees {
  firstName: string;
  lastName: string;
  salary: number;
  bankAccount: number;
  status: EmployeeStatus;
  department: IDepartment;
};

interface IDepartment {
  name: string;
  domain: string;
  employees: IEmployees[];
  budget: {
    debit: number;
    credit: number;
  };
  calculateBalance(): number;
  addNewEmployee(employee: IEmployees): void;
  removeEmployee(employee: IEmployees): void;
  convertPreHiredEmployee (preHiredEmployee: IPreHiredEmployees): IEmployees;
};

interface ICompany {
  name: string;
  department: IDepartment[];
  prehiredemployees: IPreHiredEmployees[];
  employees: IEmployees[];
};

interface IAccounting extends Department {
  balance: number;
  addToBalance(entity: IEmployees | IDepartment): void;
  removeFromBalance(entity: IEmployees | IDepartment): void;
  paySalaries(): void;
};

class PreHiredEmployees implements IPreHiredEmployees {
  constructor(
    public firstName: string,
    public lastName: string,
    public salary: number,
    public bankAccount: number
  ) {}
};

class Employees implements IEmployees {
  constructor(
    public firstName: string,
    public lastName: string,
    public salary: number,
    public bankAccount: number,
    public status: EmployeeStatus,
    public department: IDepartment
  ){}
};

class Department implements IDepartment {
  public employees: IEmployees[] = [];
  
  constructor(
    public name: string,
    public domain: string,
    public budget: {
      debit: number,
      credit: number
    },
  ){};

  public calculateBalance(): number{
    return this.budget.debit - this.budget.credit;
  };

  public addNewEmployee(employee: IEmployees): void {
    this.employees.push(employee);
    this.budget.debit += employee.salary;
  };

  public removeEmployee(employee: IEmployees): void {
    this.employees = this.employees.filter(emp=> emp != employee);
    this.budget.debit -= employee.salary;
  };

  public convertPreHiredEmployee (preHiredEmployee: IPreHiredEmployees): IEmployees {
    const newEmployee: IEmployees = new Employees(
      preHiredEmployee.firstName,
      preHiredEmployee.lastName,
      preHiredEmployee.salary,
      preHiredEmployee.bankAccount,
      EmployeeStatus.Active,
      this
    )
    this.addNewEmployee(newEmployee);
    return newEmployee;
  }
};

class Company implements ICompany {
  public department: IDepartment[] = [];
  public prehiredemployees: IPreHiredEmployees[] = [];
  public employees: IEmployees[] = [];

  constructor(public name: string){}
};

class Accounting extends Department implements IAccounting {
  public balance: number = 0;

  addToBalance(entity: IEmployees | IDepartment): void {
    if (isEmployee(entity)) {
      this.balance += entity.salary;
    } else if (isDepartment(entity)) {
      this.balance +=entity.calculateBalance();
    }
  }
  
  removeFromBalance(entity: IEmployees | IDepartment): void {
    if (isEmployee(entity)) {
      this.balance -= entity.salary;
    } else if (isDepartment(entity)) {
      this.balance -=entity.calculateBalance();
    }
  }

  paySalaries(): void {
    this.employees.forEach(employee => {
      if(employee.status === 'active') {
        this.balance -= employee.salary;
      }
    })
  }
};

function isEmployee(entity: any): entity is IEmployees {
  return (entity as IEmployees).salary !== undefined;
};

function isDepartment(entity: any): entity is IDepartment {
  return (entity as IDepartment).name !== undefined;
};
