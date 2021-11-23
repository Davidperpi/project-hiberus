import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models';
import { SignUpService } from '../../shared/services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signUpService: SignUpService, private fb: FormBuilder, private router: Router) { }
  
  public user: User = new User;
  public signupForm: FormGroup;

  ngOnInit(): void {
    this.cleanRegisterForm();
  }

  sendRegister() {
    this.user.name = this.signupForm.controls['name'].value;
    this.user.surname = this.signupForm.controls['surname'].value;
    this.user.password = this.signupForm.controls['password'].value;
    this.user.email = this.signupForm.controls['email'].value;
    this.sendUser();
  }

  cleanRegisterForm() {
    this.signupForm = this.fb.group({
      'name': [null, Validators.required],
      'surname': ['', Validators.required],
      'password': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }

  sendUser() {
    this.signUpService.add(this.user)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        err => {
          console.error(err);
        });
  }
}
