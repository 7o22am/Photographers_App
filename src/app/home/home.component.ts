import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
 
  UsersData :any;
 

  constructor( private activatedRouter: ActivatedRoute, private router:Router  ,
       private service: UsersService,){
    }
    
  ngDoCheck(): void {
     
  }

  ngOnInit(): void {
   this.GetAllUser();
  }

   
  GetAllUser() {
    this.service.GetAllUser().subscribe((res: any) => {
      this.UsersData=res;
    })
  }

  Profile(postid:any){
    this.router.navigate(["guest",postid])
    
  }
 
}
