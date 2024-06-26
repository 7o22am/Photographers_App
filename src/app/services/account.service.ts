import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isAuthenticate:boolean=false
  constructor(private http:HttpClient) { }

  login(model:any){
    
    return this.http.post( " https://localhost:7207/api/Account/login",model)
  }


  U_Register(model:any){
    
    return this.http.post( " https://localhost:7207/api/Account/Register",model)
  }


  P_Register(model:any){
    
    console.log(model);
    return this.http.post( " https://localhost:7207/api/Account/Register",model)
  }

  Verify(model:any){
    
    console.log(model);
    return this.http.post( " https://localhost:7207/api/Account/ConfirmEmail",model)
  }
}
