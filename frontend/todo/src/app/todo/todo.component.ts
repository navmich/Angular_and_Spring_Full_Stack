import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoDataService } from '../service/data/todo-data.service';
import { formatDate, DatePipe } from '@angular/common';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  id: number;
  username: string;
  todo: Todo;
  fg: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private todoDataService: TodoDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fg = this.fb.group({
      id: [''],
      username: [''],
      description: ['', Validators.required],
      targetDate: ['', Validators.required],
      done: [''],
    });

    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    this.username = sessionStorage.getItem('authenticatedUser');
    if (this.id != -1) {
      this.retrieveTodoById();
    }
  }

  retrieveTodoById() {
    this.todoDataService
      .retrieveTodoById(this.username, this.id)
      .subscribe((response) => {
        this.todo = response;
        this.setFormGroup(this.todo);
      });
  }

  saveTodo() {
    if (this.id == -1) {
      this.setTodo();
      this.todoDataService
        .createTodo(this.username, this.todo)
        .subscribe((response) => {
          // tady nemusi byt nic, response nema BODY
        });
      this.router.navigate(['/todos']);
    } else {
      this.todoDataService
        .updateTodoById(this.username, this.id, this.fg.value)
        .subscribe((response) => {
          this.todo = response;
          this.setFormGroup(this.todo);
        });
      this.router.navigate(['/todos']);
    }
  }

  private setFormGroup(todo: Todo) {
    this.fg.get('id').setValue(todo.id);
    this.fg.get('username').setValue(this.username);
    this.fg.get('description').setValue(todo.description);
    this.fg
      .get('targetDate')
      .setValue(formatDate(todo.targetDate, 'yyyy-MM-dd', 'en-US'));
    this.fg.get('done').setValue(todo.done);
  }

  private setTodo() {
    this.todo.description = this.fg.get('description').value;
    this.todo.targetDate = this.fg.get('targetDate').value;
    this.todo.done = false;
  }
  // TODO submit form programaticly
  // TODO validacni hlasky dodelat
}
