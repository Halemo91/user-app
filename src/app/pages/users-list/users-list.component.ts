import { Router } from "@angular/router";
import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { User } from "src/app/models";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  dataSource: any= [];
  ELEMENT_DATA: any;
  displayedColumns = ["userId", "name", "address", "dateOfBirth"];
  paginator: any;

  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
}

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Getting the userlist from the json file or if user enters new user data it will get it from the local storage
   *
   * @memberof UsersListComponent
   */
  ngOnInit() {
    this.authenticationService.newUsers.subscribe(response => {
      this.ELEMENT_DATA = [];
      if (response && response[0]) {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      } else {
        this.getUsers();
      }
    });
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
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
        },
        error => {
          console.log(error);
        }
      );
  }
}
