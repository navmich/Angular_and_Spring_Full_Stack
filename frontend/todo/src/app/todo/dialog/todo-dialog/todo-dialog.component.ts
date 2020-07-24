import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoDataService } from 'src/app/service/data/todo-data.service';
import { AUTHENTICATED_USER } from 'src/app/service/basic-authentication.service';
import { formatDate } from '@angular/common';
import { Todo } from '../../../clases/Todo';
// export class Todo {
//   constructor(
//     public id: number,
//     public description: string,
//     public done: boolean,
//     public targetDate: Date
//   ) {}
// }

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
})
export class TodoDialogComponent implements OnInit {
  fg: FormGroup;
  todoDataService: TodoDataService;
  username: string;
  id: number;
  showMessage: boolean;
  todo: Todo;

  warningMessage_invalidDescription = 'Enter description';
  warningMessage_invalidTargetDate = 'Enter valid date';

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.todoDataService = injector.get(TodoDataService);
  }

  ngOnInit() {
    this.fg = this.fb.group({
      id: [''],
      username: [''],
      description: ['', Validators.required],
      targetDate: ['', Validators.required],
      done: [''],
    });

    this.fg.valueChanges.subscribe((data) => {
      data.description && data.targetDate
        ? (this.showMessage = false)
        : (this.showMessage = true);
    });

    this.id = this.data;
    this.todo = new Todo(this.id, '', false, new Date());
    this.username = sessionStorage.getItem(AUTHENTICATED_USER);
    if (this.id != -1) {
      this.retrieveTodoById();
    }
  }

  onSubmit() {
    if (!this.isFormInvalid()) {
      this.saveTodo();
    } else {
      this.showMessage = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  isFormInvalid() {
    return this.fg.invalid;
  }

  retrieveTodoById() {
    this.todoDataService
      .retrieveTodoById(this.username, this.id)
      .subscribe((response) => {
        this.todo = response;
        this._setFormGroup(this.todo);
      });
  }

  saveTodo() {
    if (this.id == -1) {
      this._setTodo();
      this.todoDataService
        .createTodo(this.username, this.todo)
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else if (!this.fg.dirty) {
      this.onCancel();
    } else {
      this.todoDataService
        .updateTodoById(this.username, this.id, this.fg.value)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
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
    this.fg.get('description').setValue(todo.description);
    this.fg
      .get('targetDate')
      .setValue(formatDate(todo.targetDate, 'yyyy-MM-dd', 'en-US'));
    this.fg.get('done').setValue(todo.done);
  }

  private _setTodo() {
    this.todo.description = this.fg.get('description').value;
    this.todo.targetDate = this.fg.get('targetDate').value;
    this.todo.done = false;
  }
}