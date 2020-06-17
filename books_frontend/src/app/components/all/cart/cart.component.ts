import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {Cart} from "../../../models/cart";
import {CART_PREFIX} from "../../../app.constants";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart: Cart[]
  price = 0

  userLogged = false
  isAdmin = false

  buyErrorMsg = ''


  constructor(private cartService: CartService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userLogged = this.authService.isUserLoggedIn()
    this.isAdmin = this.authService.isAdmin()
    this.loadChart()
  }


  buy() {
    if(!this.userLogged){
      this.buyErrorMsg = 'Error. Try Again'
      return
    }



  }


  deleteOne(idForDelete: number){
    console.log('a')
    for (let i = 0; i < sessionStorage.length; i++){
      if(sessionStorage.key(i).includes(CART_PREFIX)){
        let spliter = sessionStorage.key(i).split('-')
        let id = parseInt(spliter[1])
        if(idForDelete == id){
         let quantityString = sessionStorage.getItem(sessionStorage.key(i))
          let quantity = parseInt(quantityString)
          if(quantity == 1){
            sessionStorage.removeItem(sessionStorage.key(i))
            this.loadChart()
            return
          }else{
            quantity--
            sessionStorage.setItem(sessionStorage.key(i), quantity+'')
            this.loadChart()
            return;
          }
        }
      }

    }

  }

  deleteAll(idForDelete: number){
    console.log('b')
    for (let i = 0; i < sessionStorage.length; i++){
      if(sessionStorage.key(i).includes(CART_PREFIX)){
        let spliter = sessionStorage.key(i).split('-')
        let id = parseInt(spliter[1])
        if(idForDelete == id){
          let quantityString = sessionStorage.getItem(sessionStorage.key(i))
          let quantity = parseInt(quantityString)
          sessionStorage.removeItem(sessionStorage.key(i))
          this.loadChart()
          return
          }
        }
      }

    }




  loadChart() {
    let id = []
    let number = []
    this.price = 0
    for (let i = 0; i < sessionStorage.length; i++){
      if(sessionStorage.key(i).includes(CART_PREFIX)){
        id.push(sessionStorage.key(i))
        number.push(sessionStorage.getItem(sessionStorage.key(i)))
      }

    }

    let obj = {
      id: id,
      number: number
    }

    this.cartService.loadCart(obj).subscribe(
      res => {
        this.cart = res
        for(let c of this.cart){
          this.price += c.book.ourPrice * c.quantity
        }
      }, error => {

      }
    )

  }

  orderBook(){

    if(!this.userLogged || this.isAdmin){
      alert('Morate se prvo ulogovati kako biste porucili.')
      return
    }

    let id = []
    let number = []
    this.price = 0
    for (let i = 0; i < sessionStorage.length; i++){
      if(sessionStorage.key(i).includes(CART_PREFIX)){
        id.push(sessionStorage.key(i))
        number.push(sessionStorage.getItem(sessionStorage.key(i)))
      }

    }

    let obj = {
      id: id,
      number: number
    }

    this.cartService.buy(obj).subscribe(
      res => {
        alert('You have successfully ordered');

        for (let i = 0; i < sessionStorage.length; i++){
          if(sessionStorage.key(i).includes(CART_PREFIX)){
            sessionStorage.removeItem(sessionStorage.key(i))
          }

        }
        this.router.navigate(['/booklist/all'])
      }, error => {
        alert('Greska')
      }
    )
  }

}
