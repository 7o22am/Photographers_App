import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  constructor( private activatedRouter: ActivatedRoute , private service:  UsersService ,
     private router: Router,
   ){
  }

  photoGraphers = ['مصور 1', 'مصور 2', 'مصور 3', 'مصور 4'];
  city = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];
  gender = ['male', 'famale', 'other'];
  PerTaskOrHoure = ['task', 'hour'];

  selectedphotoGrapher: any;
  selectedgender: any;
  selectedcity: any;
  selectedPerTaskOrHoure: any;
  modelCollapsed = false;
  photoGrapherCollapsed = true;
  genderCollapsed = true;
  cityCollapsed = false;
  PerTaskOrHoureCollapsed = false;
  categoryId: any;
  Search: any={
    location: "",
    gender: "",
    perHourTask: "",
    typeOfCam: "",
 
  };
 
  togglemodelCollapsed() {
    this.modelCollapsed = !this.modelCollapsed;
  }

  togglecityCollapsed() {
    this.cityCollapsed = !this.cityCollapsed;
  }

  togglephotoGrapherCollapsed() {
    this.photoGrapherCollapsed = !this.photoGrapherCollapsed;
  }


  togglegenderCollapsed() {
    this.genderCollapsed = !this.genderCollapsed;
  }
  togglePerTaskOrHoureCollapsed() {
    this.PerTaskOrHoureCollapsed = !this.PerTaskOrHoureCollapsed;
  }

  onRadioModelChange(e: any) {
  }

  getProductsByFilter() {
    if(this.selectedcity!=undefined)
    this.Search.location=this.selectedcity;

    if(this.selectedgender!=undefined)
    this.Search.gender=this.selectedgender;

    if(this.selectedPerTaskOrHoure!=undefined)
    this.Search.perHourTask=this.selectedPerTaskOrHoure;

    if(this.selectedphotoGrapher!=undefined)
    this.Search.typeOfCam=this.selectedphotoGrapher;

    
   
   this.router.navigate(['Search' , this.Search])
  }
}
