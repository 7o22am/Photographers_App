import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {
  UserData:any;
  id: any ;
  constructor(private router:Router ,  
    private service: UsersService ,private routey: ActivatedRoute){
      this.GetUser();
    }
  
  ngOnInit(): void {
    this.id = this.routey.snapshot.paramMap.get('id');
    this.GetUser();

  }
 
  GetUser() {   
    this.service.GetUser(this.routey.snapshot.paramMap.get('id')).subscribe((res: any) => {
     this.UserData=res;
 
    })
  }

}
