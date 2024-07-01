import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit  ,OnChanges{

  
  userRegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service :AccountService,
    private toastr: ToastrService,
    private authService: SocialAuthService
   
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
 
  }
  user: any;
  loggedIn: boolean | undefined;
  

  createForm() {
    this.userRegisterForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
    });
  }
  UserGoogle: any={
    email: "",
    fullname: "",
    idToken: "",
    password: "jhsadjhs@#cbjWsd4286W387%#2U36827",
    EmailConfirmed:true,
    provider:"",
    idTokn :""
 
  };
registerWithGoogle(user: any){
  this.UserGoogle.email=user.email;
  this.UserGoogle.fullname=user.name;
  this.UserGoogle.idToken=user.idToken;
  this.UserGoogle.EmailConfirmed=true;
  this.UserGoogle.idTokn=user.idToken;
  this.UserGoogle.provider=user.provider;
  localStorage.setItem('email',   user.email);
  this.service.U_Register(this.UserGoogle).subscribe((res: any) => {
    if(res.respone == "Sucess"){
      this.router.navigate(['/login'])
      this.toastr.info("Sucess , Please Confirm Your Email");
      
    }
   else
   {
    this.toastr.error(res.respone);
   }

 });
}

  ngOnInit() { this.createForm() ;
    this.authService.authState.subscribe((user) => {
      console.log(user);
     this.registerWithGoogle(user);
    });
 
   }

  register() {
    this.service.U_Register(this.userRegisterForm.value).subscribe((res: any) => {
      if(res.respone == "Sucess"){
        localStorage.setItem('email',  this.userRegisterForm.get('email')?.value);
        this.router.navigate(['/ConfirmEmail'])

        this.toastr.info("Sucess , Please Confirm Your Email");
        
      }
     else
     {
      this.toastr.error(res.respone);
     }

   });
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
 
  get phoneNumber() {
    return this.userRegisterForm.get('phoneNumber');
  }

}
