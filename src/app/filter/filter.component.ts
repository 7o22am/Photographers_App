import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  constructor( private activatedRouter: ActivatedRoute){

  }
  photoGraphers = ['مصور 1', 'مصور 2', 'مصور 3', 'مصور 4'];
  city = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah'];
  gender = ['male', 'famale', 'other'];
  selectedModel: any;
  selectedphotoGrapher: any;
  selectedgender: any;
  selectedcity: any;
  modelCollapsed = false;
  photoGrapherCollapsed = true;
  genderCollapsed = true;
  cityCollapsed = false;
  categoryId: any;

 
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

 
  onRadioModelChange(e: any) {
  }
  getProductsByFilter() {
    
  }
}
