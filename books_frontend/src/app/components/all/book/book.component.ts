import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/book/book.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GetBookService} from "../../../services/book/get-book.service";
import {Book} from "../../../models/book";
import {log} from "util";
import {cart, CART_PREFIX, LOG_USERNAME} from "../../../app.constants";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user";
import {RatingService} from "../../../services/rating/rating.service";
import {Rating} from "../../../models/rating";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private book: Book = new Book()
  private selectedBook: Book

  private bookId: number

  private isValid: String
  private quantity = 1

  private rating = 3
  private review = ''

  isAdmin: boolean
  loggedIn: boolean

  cartItems = new Array()

  postSuccess = true
  errorPostMsg = ''
  succPostMsg = ''

  user:User

  ratings: Rating[]

  private userRatedBook = false

  constructor(private router:Router,
              private getBookService: GetBookService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private ratingService: RatingService) { }


  ngOnInit() {
    this.loggedIn = this.authService.isUserLoggedIn()
    this.isAdmin = this.authService.isAdmin()


    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id'])
      //console.log(this.bookId)
    })
    this.loadBook(this.bookId)
   // console.log(this.bookId)

    this.loadRating()

  }

  loadBook (bookId:number) {
    /*console.log("usao")
    console.log(this.bookId)*/
    this.getBookService.getBook(bookId).subscribe(
      res => {
        this.book = res
        this.loggedUser()
      },
      error => {
        console.log('err')
        console.log(error)
      }
    )

  }

  addToChart (book:Book) {
    sessionStorage.setItem(CART_PREFIX + book.id+'', this.quantity+'')
    for (let i = 0; i < sessionStorage.length; i++){
      console.log(sessionStorage.getItem(sessionStorage.key(i)))
    }

  }

  loggedUser(){
    let username = sessionStorage.getItem(LOG_USERNAME)
      this.userService.loggedUser(username).subscribe(
        res =>{
          this.user = res
          this.isUserRateBook()
        }, error => {
          console.log(error)
        }
      )
  }

  writeReview(){
    console.log(this.userRatedBook)
    if(this.userRatedBook){
      this.postSuccess = false
      this.errorPostMsg = 'You have already rate this book. If you want to review again you need to delete the previous one.'
      return
    }

    this.ratingService.writeReview(this.user, this.book, this.rating, this.review).subscribe(
      res =>{

        this.postSuccess = true
        this.succPostMsg = 'You have successfully rated the book.'
        this.loadRating()
        this.isUserRateBook()
      }, error => {
        this.postSuccess = false
        this.errorPostMsg = 'Error. Try later'
      }
    )
  }

  isUserRateBook(){
    if(!this.loggedIn) this.userRatedBook = false
    if(this.isAdmin) this.userRatedBook = false

    this.ratingService.doesUserRateBook(this.user.id, this.book.id).subscribe(
      res => {

        this.userRatedBook = res
      }, error => {
        this.userRatedBook = false
        console.log(error)
      }
    )
  }

  loadRating(){
    this.ratingService.loadRatingsForBook(this.bookId).subscribe(
      res => {
        console.log(res)
        this.ratings = res
      }, error => {
        console.log(error)
      }
    )
  }

  isUserReview(id: number) {
    if(id == this.user.id) return '(YOU)'
    return ''
  }

  deleteRating(id: number) {

    this.ratingService.deleteRating(id).subscribe(
      res => {
        this.loadRating()
        this.isUserRateBook()
        this.succPostMsg = ''
        this.errorPostMsg = ''
        this.postSuccess = false
        this.review = ''
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
