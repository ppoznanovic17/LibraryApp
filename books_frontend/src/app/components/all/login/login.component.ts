import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {ADMIN} from "../../../app.constants";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username:String
  private password:String

  user:User

  errorMessage:String


  constructor(private jwtAuthService: AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  handleJWTAuthLogin() {
    this.jwtAuthService.login(this.username,this.password)
      .subscribe(
        data => {

          /*if(sessionStorage.getItem(ADMIN) == this.username){
            console.log('ADMIN WELCOME')
            this.router.navigate(['/admin/welcome'])
            return
          }*/


          this.router.navigate([''])
        },
        error => {

          this.errorMessage = 'Neuspesna prijava'
        }
      )
  }

}
