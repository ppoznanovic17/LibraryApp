import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../../models/book";
import {SERVER_API, TOKEN} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class FilterSortBookService {

  constructor(private http:HttpClient) { }

  filterSort(search) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});

    return this.http.post<Book[]>(`${SERVER_API}book/sort&filter`, search, {headers:headers})
  }


  numOfBooks(search) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});


    return this.http.post<number>(`${SERVER_API}book/size`, search, {headers:headers})


  }

}
