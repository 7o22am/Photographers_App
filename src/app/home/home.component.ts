import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  , OnChanges{

  UsersData: any;
 

  constructor(private activatedRouter: ActivatedRoute, private router: Router,
    private service: UsersService,) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngDoCheck(): void {
 
  }

  ngOnInit(): void {
    this.GetAllUser();
  }


  GetAllUser() {
      this.service.GetAllUser().subscribe((res: any) => {
        this.UsersData = res;
        this.UsersData = this.UsersData.filter((obj:any) => obj.id !=localStorage.getItem("id"));
 
      })
  }

  imgSrc(image:any){
   return  `data:image/jpeg;base64,${image}`
  }
  Profile(postid: any) {
    this.router.navigate(["guest", postid])
  }

}
