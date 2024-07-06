import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string="";

  constructor(private authService: AccountService) {}

  onSubmit() { console.log(this.email);
    this.authService.changePassword(this.email).subscribe(response => {
      console.log(response);
      // Add any additional actions (e.g., notifications) here
    }, error => {
      console.error(error);
    });
  }
}
