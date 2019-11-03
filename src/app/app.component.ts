import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { Component , OnInit} from "@angular/core";
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  open: boolean;
  routeSubscription: Subscription;
  currentURL: String;
  title: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location
  ) {}
  
ngOnInit(){
  this.routeSubscription = this.router.events.subscribe((event) => {
    this.currentURL = this.location.path();
  });
  this.authenticationService.currentUser.subscribe(
    response => {
       console.log(response)
       if(response){
         this.title = response;
       }
    });
  
}
  /**
   * this function is responsible for showing and hiding the left side bar from the header
   *
   * @memberof AppComponent
   */
  toggleMenu() {
    this.open = !this.open;
  }

  /**
   * Calling the logout function from the service
   *
   * @memberof AppComponent
   */
  logOut() {
    this.authenticationService.logout();
  }

  /**
   * Navigate to specific page
   *
   * @param {string} url
   * @memberof AppComponent
   */
  goToUrl(url: string) {
    if (url == "users") {
      this.router.navigateByUrl("/users");
    } else {
      this.router.navigateByUrl("/user/:id");
      window.location.reload();
    }
  }
}
