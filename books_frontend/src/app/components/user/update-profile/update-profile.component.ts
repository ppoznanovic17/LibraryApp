import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {SERVER_API} from "../../../app.constants";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {


  private loggedUser: User
  private user: User = new User()




  // update info
  private updateSuccessInfo: boolean
  private currPassInfo = ''
  private incorrectPasswordInfo: boolean
  private correctPassInfo: boolean
  private msgErrInfo: String
  private msgSuccess: String


  //update password
  private newPassword = ''
  private pass1 = ''
  private pass2 = ''
  private updatePassMsg = ''
  private updatePassFalse:boolean
  private updatePassTrue:boolean







  constructor(private loginService: AuthService,
              private userService: UserService) { }

  ngOnInit() {

    this.getLoggedUser(sessionStorage.getItem('user'))

  }

  updatePass() {
    if(this.pass1 != this.pass2) {
      this.updatePassFalse = true
      this.updatePassTrue = false
      this.updatePassMsg = "New password don't match with repeat password. "
      this.pass2 = ''
      return
    }
    if(this.pass1 == '' || this.pass2 == ''){
      this.updatePassFalse = true
      this.updatePassTrue = false
      this.updatePassMsg = "Field couldn't be empty. "
      return
    }


    this.userService.updatePass(this.loggedUser, this.newPassword, this.pass1).subscribe(
      res => {
        console.log(res)
        this.updatePassTrue = true
        this.updatePassFalse = false
        this.pass1 = ''
        this.pass2 = ''
        this.newPassword = ''
        this.updatePassMsg = 'Successful!'
      },

      error => {
        this.updatePassFalse = true
        this.updatePassTrue = false
        this.updatePassMsg = 'Wrong password'

      }

    )
  }

  updateInfo() {
    this.userService.updateInfo(this.loggedUser,this.currPassInfo).subscribe(
      res => {
        this.incorrectPasswordInfo = false
        this.correctPassInfo = true
        this.msgSuccess = 'Update Success!'



      }, error => {

        this.incorrectPasswordInfo = true
        this.correctPassInfo = false
        this.msgErrInfo = error.error
      }
    )

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
