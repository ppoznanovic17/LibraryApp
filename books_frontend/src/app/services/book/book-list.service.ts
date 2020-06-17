import { Injectable } from '@angular/core';
import {Book} from "../../models/book";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SERVER_API, TOKEN} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(private http:HttpClient) { }

  getBookList() {
    /*let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});
    let options = { headers: headers };*/

    return this.http.get<Book[]>(`${SERVER_API}book/all`,/*{headers:headers}*/)
  }

  searchBook(str: String) {
    /*let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});
    let options = { headers: headers };*/

    return this.http.get<Book[]>(`${SERVER_API}book/search?str=${str}`,/*{headers:headers}*/)
  }


  getBookListBest6() {
    /*let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});
    let options = { headers: headers };*/

    return this.http.get<Book[]>(`${SERVER_API}book/best`,/*{headers:headers}*/)
  }
}
