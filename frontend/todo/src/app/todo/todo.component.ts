import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoDataService } from '../service/data/todo-data.service';
import { formatDate } from '@angular/common';
import { Todo } from '../clases/Todo';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoDataService: TodoDataService;
  // TODO todo.component v dialogu ???
  id: number;
  username: string;
  todo: Todo;
  fg: FormGroup;
  showMessage: boolean;

  // TODO do Transloco
  warningMessage_invalidDescription = 'Enter description';
  warningMessage_invalidTargetDate = 'Enter valid date';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    injector: Injector
  ) {
    this.todoDataService = injector.get(TodoDataService);
  }

  ngOnInit() {
    this.fg = this.fb.group({
      id: [''],
      username: [''],
      title: ['', Validators.required],
      description: [''],
      targetDate: ['', Validators.required],
      done: [''],
    });

    this.fg.valueChanges.subscribe((data) => {
      data.description && data.targetDate
        ? (this.showMessage = false)
        : (this.showMessage = true);
    });

    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', '', false, new Date());
    this.username = sessionStorage.getItem(AUTHENTICATED_USER);
    if (this.id != -1) {
      this.retrieveTodoById();
    }
  }

  retrieveTodoById() {
    this.todoDataService
      .retrieveTodoById(this.username, this.id)
      .subscribe((response) => {
        this.todo = response;
        this._setFormGroup(this.todo);
      });
  }

  onSubmit() {
    if (!this.isFormInvalid()) {
      this.saveTodo();
    } else {
      this.showMessage = true;
    }
  }

  saveTodo() {
    if (this.id == -1) {
      this._setTodo();
      this.todoDataService
        .createTodo(this.username, this.todo)
        .subscribe(() => {
          this.router.navigate(['/todos']);
        });
    } else if (!this.fg.dirty) {
      this.onCancel();
    } else {
      this.todoDataService
        .updateTodoById(this.username, this.id, this.fg.value)
        .subscribe(() => {
          this.router.navigate(['/todos']);
        });
    }
  }

  onCancel() {
    this.router.navigate(['/todos']);
  }

  isFormInvalid() {
    return this.fg.invalid;
  }

  pickUpWarningMessage() {
    if (this.fg.controls.description.invalid) {
      return this.warningMessage_invalidDescription;
    } else if (this.fg.controls.targetDate.invalid) {
      return this.warningMessage_invalidTargetDate;
    } else {
      return null;
    }
  }

  private _setFormGroup(todo: Todo) {
    this.fg.get('id').setValue(todo.id);
    this.fg.get('username').setValue(this.username);
    this.fg.get('title').setValue(todo.title);
    this.fg.get('description').setValue(todo.description);
    this.fg
      .get('targetDate')
      .setValue(formatDate(todo.targetDate, 'yyyy-MM-dd', 'en-US'));
    this.fg.get('done').setValue(todo.done);
  }

  private _setTodo() {
    this.todo.title = this.fg.get('title').value;
    this.todo.description = this.fg.get('description').value;
    this.todo.targetDate = this.fg.get('targetDate').value;
    this.todo.done = false;
  }
}
