import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/book/book.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GetBookService} from "../../../services/book/get-book.service";
import {Book} from "../../../models/book";
import {log} from "util";
import {cart} from "../../../app.constants";

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

  constructor(private router:Router,
              private getBookService: GetBookService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id'])
      //console.log(this.bookId)
    })
    this.loadBook(this.bookId)
   // console.log(this.bookId)

  }

  loadBook (bookId:number) {
    console.log("usao")
    console.log(this.bookId)
    this.getBookService.getBook(bookId).subscribe(
      res => {
        this.book = res
        console.log("res")
        console.log(res)
      },
      error => {
        console.log('err')
        console.log(error)
      }
    )

  }

  addToChart (book:Book) {
      cart.push(book)
  }



}
