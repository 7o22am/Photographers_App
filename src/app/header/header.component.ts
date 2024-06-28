import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  islogin:boolean=false;
  constructor(  
    private service: AccountService ,
    private toastr: ToastrService, ){
  }
  ngOnInit(): void {
    this.islogin = this.service.isAuthenticate ;
  }
  ngDoCheck(): void {
    if (localStorage.getItem("Token")) {
      this.islogin = true
    } else {
      this.islogin = false
    }
  }
  logout(){
    this.toastr.success("Log Out");
    localStorage.removeItem("Token") ;
    localStorage.removeItem("id") ;
    this.service.isAuthenticate =false;
  }


}
