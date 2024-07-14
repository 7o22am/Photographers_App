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
  feedbacks:any;
  id: any ;
  imgSrc: string | undefined;
  constructor(private router:Router ,  
    private service: UsersService ,private routey: ActivatedRoute){
      this.GetUser();
    }
  
  ngOnInit(): void {
    this.id = this.routey.snapshot.paramMap.get('id');
    this.GetUser();
    this.GetFeedbacks();
  }
 
    GetUser() {   
      this.service.GetUser(this.routey.snapshot.paramMap.get('id')).subscribe((res: any) => {
     this.UserData=res;
      this.imgSrc=`data:image/jpeg;base64,${res.image}`
    })
  }
    GetFeedbacks() {   
      this.service.showFeedbacks(this.routey.snapshot.paramMap.get('id')).subscribe((res: any) => {
      this.feedbacks=res.respone;
      
    })
  }
}
