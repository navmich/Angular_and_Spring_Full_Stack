import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.fg = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  handleLogin() {
    // console.log(this.username);
    if (
      this.fg.get('username').value === 'Mike' &&
      this.fg.get('password').value === 'p'
    ) {
      this.isValid = true;
      this.router.navigate(['welcome', this.fg.get('username').value]);
    } else {
      this.isValid = false;
    }
    console.log(this.fg.controls.username.value);
  }
}
