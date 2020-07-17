package com.mike.AngularandSpringFullStack.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {

    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;
// TODO sort todos podle data ???
    static {
        todos.add(new Todo(++idCounter, "Mike", "Learn to Dance", new Date(), false));
        todos.add(new Todo(++idCounter, "Mike", "Learn about Microservices", new Date(), false));
        todos.add(new Todo(++idCounter, "Mike", "Learn about Angular", new Date(), false));
    }

    public List<Todo> findAll() {
        return this.todos;
    }

    public Todo saveTodo(Todo todo) {
        if (todo.getId() == -1 || todo.getId() == 0) {
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getUsername(), todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo deleteById(String username, long id) {
        Todo todo = findById(username, id);
        if (todo == null) return null;
        if (todos.remove(todo)) {
            return todo;
        };
        return null;
    }

    public Todo findById(String username, long id) {
        for (Todo todo : this.todos) {
            if (todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }

}
