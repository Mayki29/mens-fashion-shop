import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  userLoginOn:boolean = false;
  constructor(private loginService:LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }
      })
      if(!this.userLoginOn){
        this.router.navigate(['/login'])
        return false
      }else{
        return true
      }
  }
  
}
