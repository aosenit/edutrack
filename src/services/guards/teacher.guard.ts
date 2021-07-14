import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsService } from '../classes/notifications/notifications.service';


@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private notifyService: NotificationsService) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('access_token')) {
        return true;
      } else {
        this.notifyService.publishMessages('You are not authorized to access this route.', 'danger', 1);
        this.router.navigateByUrl('/');
        // // ('na lie');
      }
  }

}
