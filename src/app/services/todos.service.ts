import { Injectable } from '@angular/core'
import { Router } from "@angular/router"
import { ApiService } from './api.service'
import { Todo } from '../models/todo'

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    constructor(private api: ApiService) { }

    get(){
        return this.api.todos.get();
    }

    add(todo: Todo){
         return this.api.todos.post(todo);
    }

    change(todo: Todo){
        return this.api.todos.put(todo);
    }

    delete(todo: Todo){
        return this.api.todos.delete(todo);
    }

    parseDate(date: String){
        return new Date(date.toString()).getTime();
    }

}
