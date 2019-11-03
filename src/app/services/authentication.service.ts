import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  private newUsersSubject: BehaviorSubject<User>;
  public currentUser: Observable<string>;
  public newUsers: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUserSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.newUsersSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("newUserList"))
    );
    this.newUsers = this.newUsersSubject.asObservable();
  }

  /**
   *get the current username from the local storage
   *
   * @readonly
   * @type {User}
   * @memberof AuthenticationService
   */
  public get currentUserValue(): string {
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
      this.router.navigate(["/users"]);
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

    localStorage.removeItem("newUserList");
    this.newUsersSubject.next(null);
    this.router.navigateByUrl("/login");
  }

  /**
   * get list of existing users, to show in the table
   *
   * @returns
   * @memberof AuthenticationService
   */
  getUsers(): Observable<User> {
    return this.http.get<User>("../assets/users.json");
  }

  saveUser(body) {
    body = {
      id: "55555555555555555",
      firstName: "5555555555",
      lastName: "5555555",
      gender: "male",
      email: "gentrybird@skinserve.com",
      dateOfBirth:
        "Mon Jun 03 1991 15:45:39 GMT+0200 (Central European Summer Time)",
      phone: "+0049 (870) 545-2047",
      address: "418 Sumner Place, Munjor, Indiana, 5613"
    };
    this.http
      .get<any>("../assets/users.json", { observe: "body" })
      .subscribe(data => {
        data.push(body);
        console.log(data);
        localStorage.setItem("newUserList", JSON.stringify(data));

        this.newUsersSubject.next(data);
        this.snackBar.open("save success", "ok", {
          duration: 5000
        });
      });
  }
}
