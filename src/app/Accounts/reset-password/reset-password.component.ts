import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  token: any;
  email: any;
  password: string="";
  confirmPassword: string="";

  constructor(private route: ActivatedRoute, private authService: AccountService) {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.email, this.password, this.confirmPassword).subscribe(response => {
      console.log(response);
      // Add any additional actions (e.g., notifications) here
    }, error => {
      console.error(error);
    });
  }
}
