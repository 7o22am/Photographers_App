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


}