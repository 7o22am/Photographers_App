import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
 

  GetAllUser(){
    return this.http.get( " https://localhost:7207/api/Account/GetAllUser")
  }

  GetUser(id:any){
    return this.http.post( `https://localhost:7207/api/Account/GetUser/${id}`,id)
  }
  AddOrder(model:any){
    return this.http.post( `https://localhost:7207/api/Orders/Pay`,model)
  }
  Search(model:any){
 
    return this.http.post( `https://localhost:7207/api/Account/Search`,model)
  }
  CheckAvalDate(model:any){
    return this.http.post( `https://localhost:7207/api/Orders/CheckOrders`,model)
  }

  GetMyOrders(model:any){
 
    return this.http.get( `https://localhost:7207/api/Orders/GetUserOrders?id=${model}`)
  }
  changeOrderStata(model:any , model2:any){
    return this.http.get( `https://localhost:7207/api/Orders/ChangeOrderStata?id=${model}&stata=${model2}`)
  }
  AcceptedOrders(model:any  ){
    return this.http.get( `https://localhost:7207/api/Orders/GetAcceptedUserOrders?id=${model}`)
  }
  ReadyToPay(model:any  ){
    return this.http.get( `https://localhost:7207/api/Orders/ReadyToPay?id=${model}`)
  }
  changePayStata(model:any , model2:any){
    return this.http.get( `https://localhost:7207/api/Orders/ChangePayStata?id=${model}&stata=${model2}`)
  }
}
