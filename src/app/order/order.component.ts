import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { fakeAsync } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit   {
  orderId: string = "";
  UserData: any;
  PhotoGrapher: any;
  PhotoGrapherID: any="";
  OrderData: string = '';
  Odurition:any;
  OrederInvoice=0;
  isAval:boolean=false;
  isPerHour:boolean=false;
  Orderlocation:string="";
  OrderPhoneNumber:string="";
  constructor(private route: ActivatedRoute, private service: UsersService ,
     private toastr: ToastrService
  ) {
  }
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
    });
    this.GetUserData();
    this.GetPhotoGrapherData();
  }

  GetUserData() {
    this.service.GetUser(localStorage.getItem("id")).subscribe((res: any) => {
      this.UserData = res;
    });

  }
  GetPhotoGrapherData() {
    this.service.GetUser(this.orderId).subscribe((res: any) => {
      this.PhotoGrapher = res;
      this.PhotoGrapherID=res.id;
      this.OrederInvoice= Number(res.salary);
      if(res.perHourTask=="hour")
        {
         
          this.isPerHour=true;
        }
        
    });

  }
  orderDetil: any={
    user: "",
    Photographer: "",
    OrderData: "",
    typeOfTask: "",
    duration: "" ,
    invoice: 1 ,
    location:"",
    PhoneNumber:"",
    PhotographerName:""
  };
  CheckOrderAvl: any={
    Photographer: this.PhotoGrapherID,
    OrderData: this.OrderData,
  };


  Order() {
    if(this.isAval && ((this.Odurition && this.isPerHour) || !this.isPerHour ) ){
      this.orderDetil.user = this.UserData.id;
      this.orderDetil.Photographer = this.PhotoGrapher.id;
      this.orderDetil.OrderData = this.OrderData;
      this.orderDetil.typeOfTask = this.PhotoGrapher.perHourTask;
      this.orderDetil.duration = this.Odurition;
      this.orderDetil.location = this.Orderlocation;
      this.orderDetil.PhoneNumber = this.OrderPhoneNumber;
      this.orderDetil.PhotographerName = this.PhotoGrapher.fullName;
      if(this.orderDetil.duration)
      {
        this.OrederInvoice = this.OrederInvoice* Number(this.Odurition);
      }
      this.orderDetil.invoice = this.OrederInvoice;
    
      this.service.AddOrder(this.orderDetil).subscribe((res: any) => {
        this.PhotoGrapher = res;
        console.log(res);
      });
      this.toastr.success("Sucess");
    }
   else{
    if(this.isAval)
    this.toastr.error("Data Unavalible");
  else 
  this.toastr.error("houra Unvalid");
   }
  }

  CheckAval(){
    this.CheckOrderAvl.Photographer=this.PhotoGrapherID;
    this.CheckOrderAvl.OrderData=this.OrderData;
    this.service.CheckAvalDate(this.CheckOrderAvl).subscribe((res: any) => {
      console.log(res);
     if(res.respone=="Avalible"){
      this.toastr.success(res.respone);
      this.isAval =true;
     }
     else{
      this.toastr.error(res.respone);
      this.isAval =false;
     }
    });
  }
}
