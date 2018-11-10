import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from '../services/auth.service'
import { User } from '../models/user'
import { Todo } from '../models/todo';
import { TodosService } from '../services/todos.service'

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    constructor(private router: Router, private auth : AuthService, private todosService: TodosService) {

        this.logined = false;
        this.user = {} as User;
        this.todos = [] as Todo[];

    }

    user: User
    logined: boolean
    todos: Todo[];

    ngOnInit() {


        if(!localStorage['_token']){
            return this.auth.loginFailed();
        }

        this.auth.getUser().subscribe((res)=>{
            if(!res.status)
                return this.auth.loginFailed();
            this.logined = true;
            this.user = res.data;

            this.getTodos();
        });


    }

    getTodos(){
        this.todosService.get().subscribe((res)=>{
            if(!res.status)
                return;
            this.todos = res.data;
        });
    }


    onAdded(todo: Todo){
        this.todos.push(todo);
    }

    onDelete(todo: Todo){
        this.todos.splice(this.todos.indexOf(todo),1);
    }

    logout(){
        this.auth.loginFailed();
    }



}
