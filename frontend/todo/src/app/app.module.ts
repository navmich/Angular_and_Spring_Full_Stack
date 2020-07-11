import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SecondWelcomeComponent } from "./second-welcome/second-welcome.component";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SecondWelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
