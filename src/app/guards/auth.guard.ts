import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            return true;
        }
        this.snackBar.open("You dont have permission", "ok", {
            duration: 5000
          });
        // not logged in so redirect to login page 
        this.router.navigate(['/login']);
        return false;
    }
}