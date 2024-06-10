//3.1. Primitive literal types and object typing
class Lecturer {
  private _name: string;
  private _surname: string;
  private _position: string;
  private _company: string;
  private _experience: number;
  private _courses: string;
  private _contacts: string;

  constructor(
    name: string, 
    surname: string, 
    position: string,
    company: string, 
    experience: number, 
    courses: string, 
    contacts: string
  ) {
    this._name = name;
    this._surname = surname;
    this._position = position;
    this._company = company;
    this._experience = experience;
    this._courses = courses;
    this._contacts = contacts;  
  } 

  get name(): string {
    return this._name;
  }
  get surname(): string {
    return this._surname;
  }
  get position(): string {
    return this._position;
  }

  get company(): string {
    return this._company;
  }
  
  get experience(): number {
    return this._experience;
  }

  get courses(): string {
    return this._courses;
  }

  get contacts(): string {
    return this._contacts;
  }

}



class School {
   // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts
 
  get areas(): Area[] {
    return this._areas;
  }

  addArea(area: Area): void {
    this.areas.push(area);
  }

  removeArea (area: Area): void {
    this._areas = this.areas.filter(item => item != area)
  }
 
  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addLecturer(lecturer: Lecturer): void {
    this.lecturers.push(lecturer)
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter(item => item !== lecturer);
  }
}
 
class Area {
   // implement getters for fields and 'add/remove level' methods
  private _levels: Level[] = [];
  private _name: string;
 
  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel (level: Level): void {
    this._levels = this.levels.filter(item => item != level)
  }
}
 
class Level {
  // implement getters for fields and 'add/remove group' methods

  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }
  
  get groups(): Group[] {
    return this._groups;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup (group: Group): void {
    this._groups = this.groups.filter(item => item != group)
  }
}
 
class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  private _area: string;
  private _status: string;
  private _level: string;
  private _students: Student [] = []; // Modify the array so that it has a valid toSorted method*

  constructor(area: string, level: string, status: string) {
    this._area = area; 
    this._level = level;
    this._status = status;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get level(): string {
    return this._level;
  }

  set status(value: string) {
    this._status = value;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(s => s !== student);
  }

  showPerformance() {
    const sortedStudents = this._students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}
 
class Student {
  // implement 'set grade' and 'set visit' methods

  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: { [workName: string]: number } = {}; // workName: mark
  private _visits: { [lesson: string]: boolean } = {}; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade (workName: string, mark: number) {
    this._grades[workName] = mark;
  }

  setVisit (lesson: string, present: boolean) {
    this._visits[lesson] = present;
  }

  getPerformanceRating() {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (Object.values(this._visits).filter(present => present).length / Object.values(this._visits).length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}