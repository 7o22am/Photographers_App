import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
import { AccountService } from 'src/app/services/account.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  loginForm!:FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AccountService,
    private toastr: ToastrService

  ) {

  }
  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
     this.loginForm = this.fb.group({
      email: [ localStorage.getItem("email"), [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
       console.log(res.token);
     
       if(res.respone == "Sucess"){
        this.toastr.success("wellcome back");
        localStorage.setItem('Token', res.token)
        localStorage.setItem('email',  this.loginForm.get('email')?.value);
        localStorage.setItem('id',  res.id);
        this.service.isAuthenticate=true ;
        this.router.navigate(['/home'])
       }
       else if(res.respone == "Confirm email")
        {
          this.toastr.error("pelease Confirm Your email");
      localStorage.setItem('email',  this.loginForm.get('email')?.value);
          this.router.navigate(['/ConfirmEmail'])
        }
     else{
          this.toastr.error(res.respone);
     }

    })
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
