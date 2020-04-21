import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SERVER_API, TOKEN} from "../../app.constants";
import {Book} from "../../models/book";

@Injectable({
  providedIn: 'root'
})
export class GetBookService {

  constructor(private http:HttpClient) {
  }


  getBook(id:number) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)});
    let options = { headers: headers };

    return this.http.get<Book>(`${SERVER_API}book/${id}`,/*{headers:headers}*/)

  }
}
