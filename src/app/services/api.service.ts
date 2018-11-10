import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from '../models/todo';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
        this.url = environment.apiUrl;
        this.usersUrl = this.url+'/users';
        this.sessionsUrl = this.url+'/sessions';
        this.todosUrl = this.url+'/todos';

        this.users = {
            get: ()=>{
                return this.http.get(this.usersUrl, this.options());
            },
            post: (login:string, password:string) => {
                return this.http.post(this.usersUrl, {login,password}, this.options());
            }
        };

        this.sessions = {
            post: (login:string, password: string)=>{
                return this.http.post(this.sessionsUrl, {login, password}, this.options());
            }
        }

        this.todos = {
            get: ()=>{
                return this.http.get(this.todosUrl, this.options());
            },
            post: (todo: Todo)=>{
                return this.http.post<Todo>(this.todosUrl, todo, this.options());
            },
            put: (todo: Todo)=>{
                return this.http.put<Todo>(this.todosUrl+'/'+todo._id, todo, this.options());
            },
            delete: (todo: Todo)=>{
                return this.http.delete(this.todosUrl+'/'+todo._id, this.options());
            }
        }
    }

    url: String
    usersUrl: string
    sessionsUrl: string
    todosUrl: string

    users: any
    sessions: any
    todos: any

    options(){
        return {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': localStorage['_token'] || ''
          })
        };
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    };


}
