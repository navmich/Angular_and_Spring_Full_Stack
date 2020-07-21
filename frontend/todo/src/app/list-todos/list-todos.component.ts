import { Component, OnInit, Injector } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder } from '@angular/forms';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  // todos: Todo[];
  todos: FormArray = new FormArray([]);
  name: string;
  todoService: TodoDataService;
  messageDeleted: string;
  messageAllDone: string;

  displayedColumns: string[] = [
    'description',
    'targetDate',
    'isCompleted',
    'update',
    'delete',
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    injector: Injector
  ) {
    this.todoService = injector.get(TodoDataService);
  }

  ngOnInit() {
    this.todos = this.fb.array([]);
    this.name = sessionStorage.getItem('authenticatedUser');
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.name).subscribe((response) => {
      if (!response.length) {
        this.messageAllDone = 'You have just finished all Your tasks...';
        setTimeout(() => {
          this.messageAllDone = '';
        }, 5000);
      }
      // TODO jde odstranit vyprazdneni todos ??? treba patchValue ?
      this.todos = this.fb.array([]);
      for (let todo of response) {
        this.todos.push(this.fb.control(todo));
      }
      // this.todos = response;
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodoById(this.name, id).subscribe(() => {
      this.messageDeleted = `Delete of Todo ${id} Was Successful!`;
      setTimeout(() => {
        this.messageDeleted = '';
      }, 2000);
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
