import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GardGuard implements CanActivate {

  constructor(private router:Router, private authService: AccountService  ,private toastr: ToastrService ){}
  canActivate(): boolean {
    if (!localStorage.getItem("Token")) {
      this.toastr.error('Please log in and try again');
 
        this.router.navigate(["login"]);
        return false;
    }

    return true;
}
  
}
