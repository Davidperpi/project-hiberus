import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Login } from '../../shared/models/login.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { JwtTokenService } from '../../core/data-service/jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public user: Login = {
    email: '',
    password: ''
  }

  private token = {
    accessToken: '',
    refreshToken: '',
    tokenType: ''
  }

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private jwtToken: JwtTokenService, private router: Router) { }

  ngOnInit(): void {
    this.cleanLoginForm();
    window.localStorage['jwtToken'] = "";
  }

  sendUser() {
    this.user.email = this.loginForm.controls['email'].value;
    this.user.password = this.loginForm.controls['password'].value;    
    this.login();
  }

  login() {
    this.authService.login(this.user)
      .subscribe(
        data => {          
          this.token = data;
          this.jwtToken.saveToken(this.token.accessToken);
          this.router.navigate(['/user']);
        },
        err => {
          console.error(err);
        });
  } 

  cleanLoginForm() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
}
