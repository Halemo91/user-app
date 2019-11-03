import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models";

/**
 * This service is responsible for the user authentication and getting and saving user data to storage
 *
 * @export
 * @class AuthenticationService
 */
@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  private newUsersSubject: BehaviorSubject<User>;
  public currentUser: Observable<string>;
  public newUsers: Observable<User>;
  public loading: boolean;

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

  /**
   * This function is to create new user and add it to newuserssubject to get it as Observable in the user list component
   *
   * @param {*} body
   * @memberof AuthenticationService
   */
  saveUser(body: User) {
    this.loading = true;
    let addressConc =
      body.address.street +
      " " +
      body.address.houseNumber +
      "," +
      body.address.zip +
      " " +
      body.address.city;
    body = {
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: body.dateOfBirth,
      address: addressConc
    };
    //This part should be a post request, but as it is not possible to post to a local json file, this sol is a fake one.
    this.http
      .get<any>("../assets/users.json", { observe: "body" })
      .subscribe(data => {
        if (data && body) {
          let oldList = JSON.parse(localStorage.getItem("newUserList"));
          if (oldList) {
            oldList.push(body);
            localStorage.setItem("newUserList", JSON.stringify(oldList));
            this.newUsersSubject.next(oldList);
          } else {
            data.push(body);
            localStorage.setItem("newUserList", JSON.stringify(data));
            this.newUsersSubject.next(data);
          }

          this.snackBar.open("save success", "ok", {
            duration: 5000
          });
          // just to show the loading icon for few milli second
          setTimeout(() => {
            this.loading = false;
            this.router.navigateByUrl("/users");
          }, 500);
        } else {
          this.newUsersSubject.next(null);
          this.loading = false;
        }
      });
  }
}
