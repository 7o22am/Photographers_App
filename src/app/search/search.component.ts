import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  UsersData: any;
  Search: any={
    location: "",
    gender: "",
    perHourTask: "",
    typeOfCam: "",
 
  };
  constructor(private service: UsersService ,private router: Router ,
    private route: ActivatedRoute) {
    this.getUsersByFilter();
   }
   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.Search.location = params.get('location');
      this.Search.gender = params.get('gender');
      this.Search.perHourTask = params.get('perHourTask');
      this.Search.typeOfCam = params.get('typeOfCam');     
    });
    this.getUsersByFilter();
  }
  
  getUsersByFilter() {
    this.service.Search(this.Search).subscribe((res: any) => {
      console.log(res.respone);
      this.UsersData=res.respone;
   });
 
  }
 
  Profile(postid: any) {
    this.router.navigate(["guest", postid])
  }
  imgSrc(image:any){
    return  `data:image/jpeg;base64,${image}`
   }
}
