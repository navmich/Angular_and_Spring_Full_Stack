import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retrieveAllTodos(username: String) {
    return this.http.get<Todo[]>(
      `http://localhost:8080/users/${username}/todos`
    );
  }

  deleteTodoById(username: string, id: number) {
    return this.http.delete(
      `http://localhost:8080/users/${username}/todos/${id}`
    );
  }

  retrieveTodoById(username: string, id: number) {
    return this.http.get<Todo>(
      `http://localhost:8080/users/${username}/todos/${id}`
    );
  }

  updateTodoById(username: string, id: number, todo: Todo) {
    return this.http.put<Todo>(
      `http://localhost:8080/users/${username}/todos/${id}`,
      todo
    );
  }

  createTodo(username: string, todo: Todo) {
    console.log('inside createTodo');
    return this.http.post<Todo>(
      `http://localhost:8080/users/${username}/todos`,
      todo
    );
  }
}
