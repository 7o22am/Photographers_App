import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  
  userRegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
   
  ) {

  }



  createForm() {
    this.userRegisterForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    });
  }



  ngOnInit() { this.createForm() }

  register() {
 
  }

  get userName() {
    return this.userRegisterForm.get('userName');
  }
  get email() {
    return this.userRegisterForm.get('email');
  }
  get password() {
    return this.userRegisterForm.get('password');
  }
  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
  get phone() {
    return this.userRegisterForm.get('phone');
  }
  
}
