import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {NavigationStart, Router} from "@angular/router";
import {Book} from "../../../models/book";
import {cart, CART_PREFIX} from "../../../app.constants";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  keyboard: String

  cart:Book[]
  cartEmpty:boolean
  cartCnt = 0

  loggedIn: boolean
  isAdmin: boolean

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isUserLoggedIn()
    this.isAdmin = this.authService.isAdmin()

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          window.localStorage.setItem('previousUrl', this.router.url);
        }
      });

    setInterval(() => {this.cartItems()}, 100)

  }


  cartItems () {
    this.cartCnt = 0
    for (let i = 0; i < sessionStorage.length; i++){
      if(sessionStorage.key(i).includes(CART_PREFIX)){
        this.cartCnt++
      }

    }
  }




  logout(){
    this.authService.logout()
  }

}
