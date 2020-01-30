import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user";
import {SERVER_API, TOKEN} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updatePass(user: User, newPassword: String) {

    let userInfo = {
      "id" : user.id,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "username" : user.username,
      "currentPassword" : user.password,
      "phone" : user.phone,
      "email" : user.email,
      "newPassword" : newPassword
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})


    return this.http.put(`${SERVER_API}user/update`, userInfo, {headers:headers})
  }

  updateInfo (user:User, password:String) {
    let userInfo = {
      "id" : user.id,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "username" : user.username,
      "phone": user.phone,
      "password" : password

    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})
    console.log(password)

    return this.http.put(`${SERVER_API}user/update/info`, userInfo, {headers:headers})
  }

  loggedUser (username:String) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': sessionStorage.getItem(TOKEN)})


    return this.http.get<User>(`${SERVER_API}user/${username}`,{headers: headers})
  }
}
