import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public auth : AuthService) {

  }

  name: String
  password: String
  rpassword: String

  register(){
      let pr = this.auth.register(this.name,this.password,this.rpassword)
      pr && pr.subscribe((ret)=>{
          this.auth.showMessages(ret.messages);
          if(ret.status)
              this.resetForm();
      });
  }

  resetForm(){
      this.name = '';
      this.password = '';
      this.rpassword = '';
  }

  ngOnInit() {
      this.resetForm();
      this.auth.resetMessages();
  }

}
