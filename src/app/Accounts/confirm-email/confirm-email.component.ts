import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  ConfirmForm!: FormGroup
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: AccountService,) {
  }
  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.ConfirmForm = this.fb.group({
      email: localStorage.getItem("email"),
      code: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  Verify() {
    this.service.Verify(this.ConfirmForm.value).subscribe((res: any) => {
      console.log(res.token);

      if (res.respone == "User Confirm Sucessfully") {
        this.router.navigate(['/login']);
        alert("wallcome");
      }
   else{
    alert(res.respone);
   }


    })
  }

  get email() {
    return this.ConfirmForm.get('email');
  }
  get code() {
    return this.ConfirmForm.get('code');
  }
}
