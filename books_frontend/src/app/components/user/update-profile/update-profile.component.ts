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
    }
    if(this.pass1 == '' || this.pass2 == ''){
      this.updatePassFalse = true
      this.updatePassTrue = false
      this.updatePassMsg = "Field couldn't be empty. "
    }


    /*this.userService.updatePass(this.user, this.newPassword).subscribe(
      res => {
        console.log(res)
        //this.updateSuccess = true
      },

      error => {
        console.log(error)

      }

    )*/
  }

  updateInfo() {
    console.log(this.currPassInfo)
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
