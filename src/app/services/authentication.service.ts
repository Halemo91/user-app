import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models";
import { Route } from "@angular/compiler/src/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   *get the current username from the local storage
   *
   * @readonly
   * @type {User}
   * @memberof AuthenticationService
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Fake login function which is responsible for login and navigate to the list of users page
   * TODO: A fake backend call should be added to get a fake response and send it back to the component.
   * @param {string} username
   * @param {string} password
   * @returns
   * @memberof AuthenticationService
   */
  login(user: any, pass: string) {

        // login successful if there is a username 
        if (user && pass) {
          // store user name in storage
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/users']);
        }

   
  }

  /**
   * Logout function which naviagte back to the login bpage and clear the username from the storage
   *
   * @memberof AuthenticationService
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigateByUrl("/login");
  }

  /**
   * get list of existing users, to show in the table
   *
   * @returns
   * @memberof AuthenticationService
   */
  getUsers() {
    return this.http.get<User>("../assets/users.json");
  }
}
