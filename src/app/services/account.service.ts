import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    
    return this.http.post( " https://localhost:7207/api/Account/ConfirmEmail",model)
  }
  UpdataUser(model:any){  
 
    return this.http.patch( " https://localhost:7207/api/Account/UpdateUser",model)
  }
  ChangeImage(model:any){
 
    return this.http.patch( `https://localhost:7207/api/Account/ChangeImage`,model)
  }
  UpdateRate(model:any){  
 
    return this.http.patch( " https://localhost:7207/api/Account/UpdateRate",model)
  }

  changePassword(email: string)  {
    
    return this.http.get(`https://localhost:7207/api/Account/changePassword?email=${email}` );
  }

  resetPassword(token: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`https://localhost:7207/api/Account/resetPassword`, { token, email, password, confirmPassword });
  }
}
