import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
     console.log(res);
    })
  }
}
