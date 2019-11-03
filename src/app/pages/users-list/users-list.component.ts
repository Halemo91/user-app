import { Router } from '@angular/router';
import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { User } from "src/app/models";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  dataSource: User;
  ELEMENT_DATA: User[] = [];
  displayedColumns = ["userId", "name", "sex"];

  constructor(private authenticationService: AuthenticationService,
    private router: Router

   ) {}

  ngOnInit() {
    this.getUsers();
  }
  /**
   *get users from user list
   *
   * @memberof UsersListComponent
   */
  getUsers() {
    this.authenticationService
      .getUsers()
      .pipe()
      .subscribe(
        data => {
          console.log(data);
          this.dataSource = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  goToCreateUser(){
    this.router.navigateByUrl("/user/:id");

  }
}
