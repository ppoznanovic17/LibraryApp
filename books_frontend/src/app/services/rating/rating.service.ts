import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SERVER_API, TOKEN} from "../../app.constants";
import {Book} from "../../models/book";
import {Rating} from "../../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }


  writeReview(user: User, book:Book, rate: number, content: String) {

    let rating = {
      "rating" : rate,
      "content" : content,
      "user" : user,
      "book": book
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})


    return this.http.post(`${SERVER_API}rate/new`, rating, {headers:headers})
  }

  doesUserRateBook(userId: number, bookId: number){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})

    return this.http.get<boolean>(`${SERVER_API}rate/isUserRate/${userId}&${bookId}`, {headers: headers})
  }

  loadRatingsForBook(id: number){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})

    return this.http.get<Rating[]>(`${SERVER_API}rate/book/${id}`)
  }

  loadRatingsForUser(id: number){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})

    return this.http.get<Rating[]>(`${SERVER_API}rate/user/${id}`, {headers: headers})
  }

  deleteRating(id: number){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})

      return this.http.delete(`${SERVER_API}rate/delete/${id}`, {headers: headers})

  }


}
