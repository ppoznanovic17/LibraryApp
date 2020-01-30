import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SERVER_API, TOKEN} from "../../app.constants";
import {Book} from "../../models/book";

@Injectable({
  providedIn: 'root'
})
export class RemoveBookService {

  constructor(private http:HttpClient) { }

  deleteBook(bookId : number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});
    let options = { headers: headers };

    return this.http.delete(`${SERVER_API}book/remove/${bookId}`,{headers:headers})
  }
}
