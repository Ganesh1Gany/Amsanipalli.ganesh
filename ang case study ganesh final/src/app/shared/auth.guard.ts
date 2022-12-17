import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  public constructor(private loginSer: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const obj = this.loginSer['loginCred'];
      if(obj && obj[0] && obj[0]['username']) {
      console.log('guard allowed');
      return true;
    } else {
      console.log('guard not allowed');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
