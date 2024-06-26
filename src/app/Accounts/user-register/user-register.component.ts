import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

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
    private service :AccountService,

   
  ) {

  }



  createForm() {
    this.userRegisterForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    });
  }



  ngOnInit() { this.createForm() }

  register() {
    this.service.U_Register(this.userRegisterForm.value).subscribe((res: any) => {

      if(res.respone == "Sucess"){
        localStorage.setItem('email',  this.userRegisterForm.get('email')?.value);
        this.router.navigate(['/ConfirmEmail'])
        alert("weelcome")
      }
     else
     {
      alert("error")
     }

   })
  }

  get fullname() {
    return this.userRegisterForm.get('fullname');
  }
  get email() {
    return this.userRegisterForm.get('email');
  }
  get password() {
    return this.userRegisterForm.get('password');
  }
 
  get phone() {
    return this.userRegisterForm.get('phone');
  }
  
}
