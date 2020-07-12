import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // username = "default user";
  // password = "";
  fg: FormGroup;
  isValid: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hardcodedAuthService: HardcodedAuthenticationService
  ) {
    this.fg = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  handleLogin() {
    // console.log(this.username);
    if (
      this.hardcodedAuthService.authenticate(
        this.fg.get('username').value,
        this.fg.get('password').value
      )
    ) {
      this.isValid = true;
      this.router.navigate(['welcome', this.fg.get('username').value]);
    } else {
      this.isValid = false;
    }
  }
}
