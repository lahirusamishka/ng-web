import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import * as moment from "moment";

import { AuthenticationService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn().pipe(
      map((status) => {
        if (!status) {
          this.router.navigateByUrl("/login");
          return false;
        }
        const canAccess = next.data.roles;
        const userRoles = this.authService.getUserRoles();
        for (let i = 0; i < canAccess.length; i++) {
          if (canAccess[i] == userRoles) {
            return true;
          }
        }
        return false;
      })
    );
  }
}
