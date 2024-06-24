import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any = [];
  errMessage: any;
  cart: any[] = [];
  isAdded: boolean = false
  catID: any
  currentPage = 1;
  productsPerPage = 8;

  constructor( private activatedRouter: ActivatedRoute, private router:Router){

    }
    
  ngDoCheck(): void {
     
  }

  ngOnInit(): void {
    this.catID = this.activatedRouter.snapshot.paramMap.get('cid');
    console.log(this.catID)
    if (!this.catID) {
      this.getAllProducts()
    } else {
      this.getProductsByCategory();
    }
  }

  getAllProducts() {
     
  }

  getProductsByCategory() {
     
  }

  addToCart(event: any) {
    
  }

  next() {
    this.currentPage++;
    // this.scrollTo();
  }

  prev() {
    this.currentPage--;
    // this.scrollTo();
  }

  isPrevDisabled() {
    return this.currentPage === 1;
  }

  isNextDisabled() {
    return this.currentPage === Math.ceil(this.products.length / this.productsPerPage);
  }
  // scrollTo() {
  //   this.scrollToService.scrollTo({ target: 'top', duration: 500 });
  // }
}
