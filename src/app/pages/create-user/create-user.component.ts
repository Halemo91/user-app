import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  loading: boolean = false;
  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    date: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2000, 0, 1);
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {

  }
  onSubmit() {
    this.loading = true;
    console.warn(this.userForm.value);
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.authenticationService
    .saveUser(this.userForm.value);
   // this.loading = false;

  }
}
