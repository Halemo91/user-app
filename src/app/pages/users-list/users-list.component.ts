import { Router } from '@angular/router';
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
  dataSource: any;
  ELEMENT_DATA: any;
  displayedColumns = ["userId", "name", "address", "dateOfBirth"];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


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
         
          this.ELEMENT_DATA = data;
          this.dataSource =new MatTableDataSource<User>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource)

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
