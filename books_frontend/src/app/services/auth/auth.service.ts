import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ADMIN, LOG_USERNAME, SERVER_API, TOKEN} from "../../app.constants";
import {map} from "rxjs/operators";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post<User>(`${SERVER_API}reg`, user)
  }

  login(username, password) {
    return this.http.post<any>(`${SERVER_API}login`, {
      username,
      password
    }).pipe(map(
      data => {
        sessionStorage.setItem(LOG_USERNAME, username)
        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
        if(username == 'peca'){
          sessionStorage.setItem(ADMIN, username)
        }
        return data;
      }
    ))
  }

  isUserLoggedIn () {
    let user = sessionStorage.getItem(TOKEN)
    return !(user===null)
  }

  logout () {
    if(sessionStorage.getItem(LOG_USERNAME) == ADMIN){
      sessionStorage.removeItem(ADMIN)
    }
    sessionStorage.removeItem(TOKEN)
    sessionStorage.removeItem(LOG_USERNAME)

  }

  logUsername () {
    let username = sessionStorage.getItem(LOG_USERNAME)
    return username
  }

  getauthToken(){
    if(this.getAuthUser())
      return  sessionStorage.getItem(TOKEN)
  }
  getAuthUser(){
    let user = sessionStorage.getItem(LOG_USERNAME)
    return user

  }

  isAdmin() {
    let admin = sessionStorage.getItem(ADMIN)
    if( admin!= null && admin==ADMIN){
      return true
    }
    return false
  }
}
