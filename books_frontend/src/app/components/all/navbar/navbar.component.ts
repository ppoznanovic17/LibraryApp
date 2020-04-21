import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {NavigationStart, Router} from "@angular/router";
import {Book} from "../../../models/book";
import {cart} from "../../../app.constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  keyboard: String

  cart:Book[]
  cartEmpty:boolean

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


    this.cart = cart
    this.cartItems()
  }



  onSearchByTitle() {

  }

  cartItems () {
    if(this.cart!= null && this.cart.length >= 1){
      this.cartEmpty = false
      return
    }
    this.cartEmpty = true
  }

  showSearch () {
    if(this.router.url.includes('booklist')){
      return false
    }
    return true
  }



  logout(){
    this.authService.logout()
  }

}
