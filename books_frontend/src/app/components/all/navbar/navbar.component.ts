import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  keyboard: String

  loggedIn: boolean
  isAdmin: boolean

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isUserLoggedIn()
    this.isAdmin = this.authService.isAdmin()
  }

  onSearchByTitle() {

  }





  logout(){
    this.authService.logout()
  }

}
