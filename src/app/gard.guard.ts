import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class GardGuard implements CanActivate {

  constructor(private router:Router, private authService: AccountService  ){}
  canActivate(): boolean {
    if (!localStorage.getItem("Token")) {
     alert('Please log in and try again')
        this.router.navigate(["login"]);
        return false;
    }

    return true;
}
  
}
