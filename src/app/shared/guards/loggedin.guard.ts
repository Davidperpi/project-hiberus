import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  constructor( private routes: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('jwtToken').length > 0) {
        return true;
      }
      else {
        this.routes.navigate(['/']);
        return false;
      }
  }
}