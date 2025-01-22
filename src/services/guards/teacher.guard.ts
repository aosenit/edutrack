import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { NotificationsService } from "../classes/notifications/notifications.service";

@Injectable({
  providedIn: "root",
})
export class TeacherGuard implements CanActivateChild {
  loggedInUser: any;
  constructor(
    private router: Router,
    private notifyService: NotificationsService
  ) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const helper = new JwtHelperService();

    this.loggedInUser = helper.decodeToken(
      localStorage.getItem("access_token")
    );

    if (
      localStorage.getItem("access_token") &&
      this.loggedInUser.UserType === "TeachingStaff"
    ) {
      return true;
    } else {
      this.notifyService.publishMessages(
        "You are not authorized to access this route.",
        "danger",
        1
      );
      this.router.navigateByUrl("/");
      // // ('na lie');
    }
  }
}
