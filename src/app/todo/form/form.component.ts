import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    constructor(private todos: TodosService) {
        this.title = "";
        this.description = "";
        this.date = "";
        this.errors = [];
    }

    @Output() added = new EventEmitter<Todo>();

    title: String
    description: String
    date: String

    errors: any

    add(){

        this.errors = [];
        if(!this.title.trim() || !this.description.trim() || !this.date.trim())
        return this.errors.push("All Fields Required");

        let todo = {} as Todo;
        todo.title = this.title;

        todo.description = this.description;
        todo.date = this.todos.parseDate(this.date);
        this.todos.add(todo).subscribe((res)=>{
            this.errors = res.messages;
            if(!res.status) return;
            this.added.emit(todo);
        });
    }


    ngOnInit() {
    }

}
