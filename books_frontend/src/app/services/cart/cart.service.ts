import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SERVER_API, TOKEN} from "../../app.constants";
import {Book} from "../../models/book";
import {Cart} from "../../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  loadCart(body) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.post<Cart[]>(`${SERVER_API}cart/getCart`, body, {headers:headers})

  }

  buy(body) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})


    return this.http.put(`${SERVER_API}book/sell`, body, {headers:headers})

  }

}
