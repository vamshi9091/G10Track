import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "changepassword", component: Login2Component },
  // { path: "signup", component: SignupComponent },
  // { path: "chngpwd", component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
