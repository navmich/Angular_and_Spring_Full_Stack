import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoDataService } from '../service/data/todo-data.service';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  id: number;
  username: string;
  targetDate: string;
  fg: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private todoDataService: TodoDataService
  ) {}

  ngOnInit() {
    this.fg = this.fb.group({
      description: [''],
      targetDate: [''],
      done: [''],
    });

    this.id = this.route.snapshot.params['id'];
    this.username = sessionStorage.getItem('authenticatedUser');
    this.retrieveTodoById();
  }

  retrieveTodoById() {
    this.todoDataService
      .retrieveTodoById(this.username, this.id)
      .subscribe((response) => {
        this.fg.get('description').setValue(response.description);
        this.targetDate = formatDate(
          response.targetDate,
          'yyyy-MM-dd',
          'en-US'
        );
        this.fg.get('targetDate').setValue(this.targetDate);
        this.fg.get('done').setValue(response.done);
      });
  }

  saveTodo() {
    // this.todoDataService.
    // TODO dodelat
  }
}
