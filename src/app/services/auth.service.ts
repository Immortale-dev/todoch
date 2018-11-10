import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { Router } from "@angular/router"

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    messages: any

    constructor(private api : ApiService, private router: Router) {
        this.messages = {
            error:[],
            success:[],
        }
        this.resetMessages();
    }

    login(login:String, password:String){
        this.resetMessages();
        return this.api.sessions.post(login, password);
    }

    getUser(){
        return this.api.users.get(localStorage['_token']);
    }

    register(login:String, password:String, rpassword: String){

        this.resetMessages();
        if(password != rpassword)
            this.messages.error.push('Password Don\'t Match');
        if(!login.trim().length || !password.trim().length || !rpassword.trim().length)
            this.messages.error.push('All Fields Required');

        if(this.messages.error.length)
            return;

        return this.api.users.post(login, password);

    }

    showMessages(msgs: any){
        for(let it of msgs){
            this.messages[it.type].push(it.message);
        }
    }

    resetMessages(){

        this.messages.error.splice(0);
        this.messages.success.splice(0);
    }

    loginFailed(){
        delete localStorage['_token'];
        this.router.navigate(['/login']);
    }


}
