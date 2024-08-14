import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TypeOptions } from '../interfaces/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const types = TypeOptions;
    const token = this.authService.getUser()?.token 
    const userTypeIndex  = this.authService.getUser()?.type; 
    const expectedType = route.data.expectedType; 

    
    if (state.url === '/Auth/Login') {
      localStorage.clear();
    }

  if (token && userTypeIndex !== undefined ) {
      const userType = types[userTypeIndex];

      if (Array.isArray(expectedType)) {
        if (expectedType.includes(userType)) {
          return true;
        }
      } else if (userType === expectedType) {
        return true;
      }
    }

    this.router.navigate(['/Auth/Login']);
    return false;
  }
  
}
