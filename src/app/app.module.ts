import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './todo/form/form.component';
import { TodComponent } from './todo/tod/tod.component';

const appRoutes: Routes = [
    {path: '', component: TodoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    FormComponent,
    TodComponent
  ],
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
