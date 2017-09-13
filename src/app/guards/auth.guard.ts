import {Injectable, OnDestroy} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  isAuthenticated: boolean;
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate() {
    // this.userService.isLoggedIn()

    // this.subscription = this.store
    //   .select(fromRoot.getAuthStatus)
    //   .subscribe(isAuthenticated => {
    //     this.isAuthenticated = isAuthenticated;
    //     if(!isAuthenticated) {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   })
    //
    return this.isAuthenticated;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
