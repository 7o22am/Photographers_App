import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , OnChanges{
  EditForm!: FormGroup
  UserData: any;
  id: any;
  displayEdit = 'none';
 
 
  constructor(private router: Router, private fb: FormBuilder,
    private service: UsersService, private service2: AccountService,
    private toastr: ToastrService, private routey: ActivatedRoute,
    private http: HttpClient, private sanitizer: DomSanitizer) {

  }
  ngOnChanges(changes: SimpleChanges): void {
 
  }
  options = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];
  selectedOptions: string = "";
 
 

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

  ngOnInit(): void {
     this.GetUser();
    this.createForm()
    this.displayEdit = 'none';
 
  }
  createForm() {
    this.EditForm = this.fb.group({
      email: localStorage.getItem("email"),
      fullname: ['', [Validators.pattern(/^[a-zA-Z\s]{3,}$/)]],
      phoneNumber: ['', [Validators.pattern(/^01[0-9]{9}$/)]],
      title: ['', []],
      addries: ['', []],
      location: ['', []],
      typeOfUser: ['', []],
      typeOfCam: ['', []],
      salary: ['', []],
      perHourTask: ['', []],
      lastWork: ['', []],

    })
  }
  imageData: any;
  imgSrc:any;
  GetUser() {
    this.service.GetUser(localStorage.getItem("id")).subscribe((res: any) => {
      this.UserData = res;
      this.selectedOptions = res.location;
 
      this.imgSrc=`data:image/jpeg;base64,${res.image}`
    });

  }
 
 
  Edit() {
    if (this.selectedOptions != "") {
      this.EditForm.controls['location'].setValue(this.selectedOptions);
    }

    this.service2.UpdataUser(this.EditForm.value).subscribe((res: any) => {
      console.log(res.token);
      if (res.respone == "Sucess") {
        this.toastr.success(res.respone + " Edit Data");
        this.displayEdit = 'none';
        this.GetUser();
      }
      else {
        this.toastr.error(res.respone);
      }

    })
  }
  EditData() {
    this.GetUser();
    this.displayEdit = 'flex';
  }
  close() {
    this.displayEdit = 'none';
  }


  get fullname() {
    return this.EditForm.get('fullname');
  }

  get phoneNumber() {
    return this.EditForm.get('phoneNumber');
  }
  get addries() {
    return this.EditForm.get('addries');
  }
  get title() {
    return this.EditForm.get('title');
  }
  get location() {
    return this.EditForm.get('location');
  }
  get typeOfUser() {
    return this.EditForm.get('typeOfUser');
  }
  get typeOfCam() {
    return this.EditForm.get('typeOfCam');
  }
  get salary() {
    return this.EditForm.get('salary');
  }
  get lastWork() {
    return this.EditForm.get('lastWork');
  }
  get perHourTask() {
    return this.EditForm.get('perHourTask');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    formData.append('email', this.UserData.email);
    this.saveImageToDatabase(formData)
  }



  saveImageToDatabase(formData: any) {

    this.service2.ChangeImage(formData).subscribe((res: any) => {
      console.log(res.token);
      if (res.respone == "Sucess") {
        this.toastr.success(res.respone + " Edit Data");
        this.displayEdit = 'none';
        this.GetUser();
      }
      else {
        this.toastr.error(res.respone);
      }

    })

  }
}
