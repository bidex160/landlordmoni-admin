import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from 'src/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  constructor(
    public authS: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guard();
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guard();
  }
  guard() {
    if (this.authS.isAuthenticated) return true;
    else {
      this.router.navigate(['/auth/login'], {
        queryParams: { r: location.href.replace(location.origin, '') },
      });
      return false;
    }
  }
}
