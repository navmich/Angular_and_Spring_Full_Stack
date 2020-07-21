import { Injectable, Injector } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  hardcodedAuthService: HardcodedAuthenticationService;

  constructor(injector: Injector, private router: Router) {
    this.hardcodedAuthService = injector.get(HardcodedAuthenticationService);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // jestli je user logged in, pak true -> can activate route
    if (this.hardcodedAuthService.isUserLoggedIn()) {
      return true;
    }
    // jestli neni user logged in, pak false -> can not activate route -> routuje na login page
    this.router.navigate(['login']);
    return false;
  }
}
