import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

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
  todos: Todo[];
  name: string;
  message: string;

  constructor(private todoService: TodoDataService, private router: Router) {}

  ngOnInit() {
    this.name = sessionStorage.getItem('authenticatedUser');
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.name).subscribe((response) => {
      this.todos = response;
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodoById(this.name, id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of Todo ${id} Was Successful!`;
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id]);
  }
}
