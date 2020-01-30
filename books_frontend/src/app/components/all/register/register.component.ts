import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private username: String
  private password: String
  private email: String

  user: User

  regMsg: String


  constructor(private jwtAuthService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleRegister() {

    if (this.username.length  && this.password.length  && this.email.length ) {
      let user = new User()
      user.email = this.email
      user.password = this.password
      user.username = this.username
      this.jwtAuthService.register(user).subscribe(
        res => {
          this.user = res
          if( this.user.username  == 'error'){
            this.regMsg = 'Username already exist!'
            console.log('Username already exist!')
            return;
          }
          if( this.user.email  == 'error'){
            this.regMsg = 'Email already exist!'
            console.log('Email already exist!')
            return
          }
          console.log('You are registered')
          this.regMsg = 'You are registered!'
        },
        error => {
          this.regMsg = 'Fail'
        }
      )
    } else {
      this.regMsg = 'Neuspesna registracija'
    }


  }
}
