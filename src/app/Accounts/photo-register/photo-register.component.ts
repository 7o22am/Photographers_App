import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-photo-register',
  templateUrl: './photo-register.component.html',
  styleUrls: ['./photo-register.component.scss']
})

export class PhotoRegisterComponent {

  public selectedItems: any[] = [];
  PhoterRegisterForm!: FormGroup;
  formStata: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private service: AccountService,
    private toastr: ToastrService,
  ) {

  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  options = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];
  selectedOptions: string="";

  toggleOption(option: string) {
    if (this.isSelected(option)) {
      this.selectedOptions = this.selectedOptions
        .split(" - ")
        .filter(o => o !== option)
        .join(" - ");
       
    } else {
      if (this.selectedOptions) {
        this.selectedOptions += " - ";
      }
      this.selectedOptions += option;
    }
  }

  isSelected(option: string) {
    return this.selectedOptions.includes(option);
  }
  isSelectOpen = false;
  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen;
  }

  
  createForm() {
    this.PhoterRegisterForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      title: ['', [Validators.required]],
      addries: ['', [Validators.required]],
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

    this.formStata = !this.formStata;
    console.log(this.formStata);
  }

  ngOnInit() { this.createForm() }

  register() {
    this.PhoterRegisterForm.controls['location'].setValue(this.selectedOptions);
    this.service.P_Register(this.PhoterRegisterForm.value).subscribe((res: any) => {

      if (res.respone == "Sucess") {
        this.toastr.success("Sucess , Please Confirm Your Email");
        localStorage.setItem('email', this.PhoterRegisterForm.get('email')?.value);
        this.router.navigate(['/ConfirmEmail']);


      }
      else {
        this.toastr.error(res.respone);
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
  get phoneNumber() {
    return this.PhoterRegisterForm.get('phoneNumber');
  }
  get addries() {
    return this.PhoterRegisterForm.get('addries');
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

