import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/all/login/login.component";
import {NavBarComponent} from "./components/admin/nav-bar/nav-bar.component";
import {RegisterComponent} from "./components/all/register/register.component";
import {AddNewBookComponent} from "./components/admin/add-new-book/add-new-book.component";
import {WelcomeComponent} from "./components/admin/welcome/welcome.component";
import {BookListComponent} from "./components/admin/book-list/book-list.component";
import {ViewBookComponent} from "./components/admin/view-book/view-book.component";
import {EditBookComponent} from "./components/admin/edit-book/edit-book.component";
import {RouteGuardService} from "./services/route-guard.service";
import {RouteGuardAdminService} from "./services/route-guard-admin.service";
import {ErrorComponent} from "./components/all/error/error.component";
import {HomeComponent} from "./components/all/home/home.component";
import {ForgetpassComponent} from "./components/all/forgetpass/forgetpass.component";
import {MyprofileComponent} from "./components/user/myprofile/myprofile.component";
import {UpdateProfileComponent} from "./components/user/update-profile/update-profile.component";
import {BookComponent} from "./components/all/book/book.component";
import {BooklistAllComponent} from "./components/all/booklist-all/booklist-all.component";


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgetpass', component: ForgetpassComponent},
  { path: 'book/:id', component: BookComponent},
  { path: 'booklist/:name', component: BooklistAllComponent},
  { path: 'admin/newbook', component: AddNewBookComponent, canActivate: [RouteGuardAdminService]},
  { path: 'admin/welcome', component: WelcomeComponent, canActivate: [RouteGuardAdminService]},
  { path: 'admin/booklist', component: BookListComponent, canActivate: [RouteGuardAdminService]},
  { path: 'admin/book/:id', component: ViewBookComponent, canActivate: [RouteGuardAdminService]},
  { path: 'admin/book/edit/:id', component: EditBookComponent, canActivate: [RouteGuardAdminService]},
  { path: 'user/profile', component: MyprofileComponent, canActivate: [RouteGuardService]},
  { path: 'user/update', component: UpdateProfileComponent, canActivate: [RouteGuardService]},


  {path: '**', component:ErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

