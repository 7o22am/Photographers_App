import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = "";

  constructor(private authService: AccountService, private toastr: ToastrService, private router: Router) { }

  onSubmit() {
    console.log(this.email);
    this.authService.changePassword(this.email).subscribe(response => {
      if (response) {
        this.toastr.success("Email Sent Successfuly");
        this.router.navigate(['/login'])
      }
      else{
        this.toastr.success(response);
      }

    }, error => {
      
      
     this.toastr.error("Error, Try agine " );
    });
  }
}
