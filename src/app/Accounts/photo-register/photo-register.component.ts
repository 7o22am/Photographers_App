import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-photo-register',
  templateUrl: './photo-register.component.html',
  styleUrls: ['./photo-register.component.scss']
})

export class PhotoRegisterComponent {


  PhoterRegisterForm!: FormGroup;
  formStata:boolean=true;

  constructor(private fb: FormBuilder,private router: Router,  private service :AccountService) {

  }
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  cities: string[] = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];

  createForm() {
    this.PhoterRegisterForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      title: ['', [Validators.required]],
      address: ['', [Validators.required]],
      Nationality: ['', [Validators.required]],
      location: ['', [Validators.required]],
      typeOfUser: ['', [Validators.required]],
      typeOfCam: ['', [Validators.required]],
      NationalId: ['', [Validators.required], Validators.pattern(/^01[0-9]{9}$/)],
      gender: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      perHourTask: ['', [Validators.required]],
   //   Image: ['', [Validators.required]],
      lastWork: ['', [Validators.required]],

    });
  }

  form2() {
    
    this.formStata=!this.formStata;
    console.log( this.formStata);
     }

  ngOnInit() { this.createForm() }

  register() {
 
    this.service.P_Register(this.PhoterRegisterForm.value).subscribe((res: any) => {

      if(res.respone == "Sucess"){
        localStorage.setItem('email',  this.PhoterRegisterForm.get('email')?.value);
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
    return this.PhoterRegisterForm.get('fullname');
  }
  get email() {
     
    return this.PhoterRegisterForm.get('email');
  }
  get password() {
    return this.PhoterRegisterForm.get('password');
  }
  get phone() {
    return this.PhoterRegisterForm.get('phone');
  }
  get address() {
    return this.PhoterRegisterForm.get('address');
  }
  get title() {
    return this.PhoterRegisterForm.get('title');
  }
  get location() {
    return this.PhoterRegisterForm.get('location');
  }
  get typeOfUser() {
    return this.PhoterRegisterForm.get('typeOfUser');
  }
  get typeOfCam() {
    return this.PhoterRegisterForm.get('typeOfCam');
  }
  get NationalId() {
    return this.PhoterRegisterForm.get('NationalId');
  }
  get gender() {
    return this.PhoterRegisterForm.get('gender');
  }
  get salary() {
    return this.PhoterRegisterForm.get('salary');
  }
//  get Image() {
 //   return this.PhoterRegisterForm.get('Image');
//  }
  get lastWork() {
    return this.PhoterRegisterForm.get('lastWork');
  }
  get perHourTask() {
    return this.PhoterRegisterForm.get('perHourTask');
  }
  get Nationality() {
    return this.PhoterRegisterForm.get('Nationality');
  }
  
}
