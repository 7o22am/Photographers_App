import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { UsersService } from 'src/app/services/users.service';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from 'src/app/stripe.service';
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
  displayMyOrders = 'none';
  displayRequier = 'none';
  displayPay = 'none';
 
  constructor(private router: Router, private fb: FormBuilder,
    private service: UsersService, private service2: AccountService,
    private toastr: ToastrService, private routey: ActivatedRoute,
    private http: HttpClient, private sanitizer: DomSanitizer ,
    private stripeService: StripeService) {
     
  }
  
  ngOnChanges(changes: SimpleChanges): void {

  }
  options = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];
  selectedOptions: string = "";
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
 

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

  async ngOnInit(): Promise<void> {
     this.GetUser();
    this.createForm()
    this.GetMyOrders();
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
      gender: ['', []],

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
    this.displayMyOrders = 'none';
    this.displayRequier = 'none';
    this.displayPay = 'none';
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
  get gender() {
    return this.EditForm.get('gender');
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

  GetMyOrders(){
    this.service.GetMyOrders(localStorage.getItem("id")).subscribe((res: any) => {
      this.OrdersData=res.respone;
    });
  }
OrdersData:any;
  MyOrders(){
    console.log(this.OrdersData)
    this.displayMyOrders = 'flex';
  }

  acceptOrder(id:any ,stata:any){
    this.service.changeOrderStata(id ,stata).subscribe((res: any) => {
      console.log(res);
      this.GetMyOrders();
      this.toastr.info(stata);
 
    });
  }
  ignoraOrder(id:any,stata:any){
    this.service.changeOrderStata(id ,stata).subscribe((res: any) => {
      console.log(res);
      this.GetMyOrders();
      this.toastr.info(stata);
 
    });
  }
acceptedData:any ;
  Required(){
    this.service.AcceptedOrders(localStorage.getItem('id')).subscribe((res: any) => {
      this.acceptedData =res.respone;
    });
    this.displayRequier='flex'
  }

  Finished(id:any,stata:any){
    this.service.changeOrderStata(id ,stata).subscribe((res: any) => {
      console.log(res);
      this.Required();
      this.toastr.info(stata);
 
    });
  }

  ReadyToPayData:any ;
  Pay(){
    this.service.ReadyToPay(localStorage.getItem('id')).subscribe((res: any) => {
      this.ReadyToPayData =res.respone;
    });
    this.displayPay = 'flex';
  }
  async EndPay(id:any,stata:any){

 
   
    // this.service.changePayStata(id ,stata).subscribe((res: any) => {
    //   console.log(res);
    //   this.Pay();
    //   this.toastr.info(stata);
    // });
  }
  
  
  pay(amount :number , id:any){
    this.router.navigate(['/CompletePay' ,amount ,id]);
  }

  
 
  
}
