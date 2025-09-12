import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required, Validators.maxLength(50)]
      ],
      password: ['', [
        Validators.required, Validators.maxLength(50)]
      ]
    });
  }

  login() {
    this.loginService.loginMock();
    this.router.navigate(["home"]);
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }
}
