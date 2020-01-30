import { Component, OnInit } from '@angular/core';
import {SERVER_API} from "../../../app.constants";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  private serverPath = `${SERVER_API}`
  private dataFetched = false
  private logginfError:boolean
  private loggedIn:boolean
  private credential = {'username' : '',
                        'password': ''}

  private user: User = new User()
  private updateSuccess: boolean
  private newPassword: String
  private incorrectPassword: boolean

  private loggedUser:User

  constructor(private loginService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
      this.getLoggedUser(sessionStorage.getItem('user'))
  }



  getLoggedUser (username: String) {
    this.userService.loggedUser(username).subscribe(
      res => {
        this.loggedUser = res
      }, error => {
        console.log(error)
      }

    )
  }

}
