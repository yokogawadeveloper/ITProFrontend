import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService ,private router: Router ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); 
      return false;
    }
    return true;
  }
  
}
