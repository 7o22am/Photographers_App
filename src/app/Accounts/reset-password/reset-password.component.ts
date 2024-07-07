import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token: any;
  email: any;
  password: string = "";
  confirmPassword: string = "";

  constructor(private route: ActivatedRoute, private authService: AccountService,
    private toastr: ToastrService, private router: Router,

  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');

  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.email, this.password, this.confirmPassword).subscribe(response => {
      if (response) {

        this.toastr.success("Password has been reset successfully");
        this.router.navigate(['/login'])
      }
      else{
        this.toastr.error("Error");
      }
    }, error => {
      console.log(error)
      this.toastr.error("Error");
    });
  }
}
