import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routing: Routes = [

  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  //{ path: '', component: UsersListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: CreateUserComponent,  canActivate: [AuthGuard] },
  // otherwise redirect to usersComponent
  { path: '**', redirectTo: 'users' }
];


//export const AppRoutingModule = RouterModule.forRoot(routing);

@NgModule({
  imports: [
    RouterModule.forRoot(
      routing
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
