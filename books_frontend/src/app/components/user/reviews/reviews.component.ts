import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {RatingService} from "../../../services/rating/rating.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LOG_USERNAME} from "../../../app.constants";
import {User} from "../../../models/user";
import {Rating} from "../../../models/rating";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {


  user:User

  ratings:Rating[]

  constructor( private router:Router,
               private route: ActivatedRoute,
               private authService: AuthService,
               private userService: UserService,
               private ratingService: RatingService) { }

  ngOnInit() {

    this.loggedUser()

  }

  loadRating(){
    this.ratingService.loadRatingsForUser(this.user.id).subscribe(
      res => {
        console.log(res)
        this.ratings = res
      }, error => {
        console.log(error)
      }
    )
  }

  loggedUser(){
    let username = sessionStorage.getItem(LOG_USERNAME)
    this.userService.loggedUser(username).subscribe(
      res =>{
        this.user = res
        this.loadRating()
      }, error => {
        console.log(error)
      }
    )
  }

  deleteRating(id: number) {

    this.ratingService.deleteRating(id).subscribe(
      res => {
        this.loadRating()
      }, error => {

      }
    )

  }

  setBgColor(x: number) {
    if(x==1) return 'red'
    if(x==2) return '#DD571C'
    if(x==3) return '#FCAE1E'
    if(x==4) return '#009900'
    if(x==5) return '#00E600'

  }

}
