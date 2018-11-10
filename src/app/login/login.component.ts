import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {

  }

  name: String
  password: String

  login(){
      let pr = this.auth.login(this.name,this.password);
      pr && pr.subscribe((ret)=>{
          this.auth.showMessages(ret.messages);
          if(ret.status){
              localStorage['_token'] = ret.data.token;
              this.router.navigate(['/']);
          }
      });
  }

  resetForm(){
      this.name = '';
      this.password = '';
  }

  ngOnInit() {
      this.resetForm();
      this.auth.resetMessages();
  }

}
