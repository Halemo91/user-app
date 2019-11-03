import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AppHeaderComponent } from './ui/app-header/app-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSnackBarModule, MatSidenavModule, MatTableModule, MatIconModule, MatToolbarModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, AppHeaderComponent, UsersListComponent, LoginComponent, CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
