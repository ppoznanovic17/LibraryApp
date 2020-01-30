import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../../models/book";
import {SERVER_API, TOKEN} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  sendBook(book:Book) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});


      return this.http.post(`${SERVER_API}book/add`, book, {headers:headers})


  }

  updateBook ( book:Book ) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});


    return this.http.put(`${SERVER_API}book/update`, book, {headers:headers})

  }
}
