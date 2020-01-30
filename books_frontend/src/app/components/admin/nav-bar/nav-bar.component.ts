import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private LogIn = false;

  constructor(private  router:Router,
              private jwtAuthService:AuthService) { }

  ngOnInit() {

    this.LogIn = this.jwtAuthService.isAdmin() && this.jwtAuthService.isUserLoggedIn()
  }


  c


  logout() {
    this.jwtAuthService.logout()
    this.router.navigate([''])

  }

}
