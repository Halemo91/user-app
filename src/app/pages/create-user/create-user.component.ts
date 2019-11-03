import { logging } from "protractor";
import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  issubmitted: boolean;
  userForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    dateOfBirth: ["", Validators.required],
    address: this.formBuilder.group({
      street: ["", Validators.required],
      houseNumber: ["", Validators.required],
      city: ["", Validators.required],
      zip: ["", Validators.required]
    })
  });
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2000, 0, 1);

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  /**
   * getting the loading boolean from the service
   *
   * @readonly
   * @memberof CreateUserComponent
   */
  get loading() {
    return this.authenticationService.loading;
  }
  ngOnInit() {}
  /**
   * call saave user from service to create the new user and add it to the list
   *
   * @returns
   * @memberof CreateUserComponent
   */
  onSubmit() {
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.authenticationService.saveUser(this.userForm.value);
    this.issubmitted = true;
  }
}
