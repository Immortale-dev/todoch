import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
    selector: 'app-tod',
    templateUrl: './tod.component.html',
    styleUrls: ['./tod.component.scss']
})
export class TodComponent implements OnInit {

    @Output() deleted = new EventEmitter<Todo>();

    currentDate: Number

    constructor(private todos: TodosService) {

    }

    delete(){
        this.todos.delete(this.todo).subscribe();
        this.deleted.emit(this.todo);
    }

    change(){
        this.todos.change(this.todo).subscribe();
    }

    @Input() todo: Todo;

    ngOnInit() {
        this.currentDate = Date.now()
    }

}
