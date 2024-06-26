import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  islogin:boolean=false;
  constructor(  
    private service: AccountService ){
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
    localStorage.removeItem("Token") ;
    this.service.isAuthenticate =false;
  }


}
