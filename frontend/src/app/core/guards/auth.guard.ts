import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private tokenService: TokenService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.tokenService.getToken();
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
