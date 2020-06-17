import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material';
import { NavBarComponent } from './components/admin/nav-bar/nav-bar.component'
import {MatToolbarModule} from "@angular/material/toolbar";
import { LoginComponent } from './components/all/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { RegisterComponent } from './components/all/register/register.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './components/all/home/home.component';
import { AddNewBookComponent } from './components/admin/add-new-book/add-new-book.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { BookListComponent } from './components/admin/book-list/book-list.component';
import {HttpIntercepterBasicAuthService} from "./services/http/http-intercepter-basic-auth.service";
import { ViewBookComponent } from './components/admin/view-book/view-book.component';
import {MatListModule} from "@angular/material/list";
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { ErrorComponent } from './components/all/error/error.component';
import { NavbarComponent } from './components/all/navbar/navbar.component';
import { ForgetpassComponent } from './components/all/forgetpass/forgetpass.component';
import { MyprofileComponent } from './components/user/myprofile/myprofile.component';
import { UpdateProfileComponent } from './components/user/update-profile/update-profile.component';
import { BookComponent } from './components/all/book/book.component';
import { BooklistAllComponent } from './components/all/booklist-all/booklist-all.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/all/footer/footer.component';
import { CartComponent } from './components/all/cart/cart.component';
import { ReviewsComponent } from './components/user/reviews/reviews.component';
import { AboutComponent} from "./components/all/about/about.component";
import { FaqComponent } from './components/all/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddNewBookComponent,
    WelcomeComponent,
    BookListComponent,
    ViewBookComponent,
    EditBookComponent,
    ErrorComponent,
    NavbarComponent,
    ForgetpassComponent,
    MyprofileComponent,
    UpdateProfileComponent,
    BookComponent,
    BooklistAllComponent,
    FooterComponent,
    CartComponent,
    ReviewsComponent,
    AboutComponent,
    FaqComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
