import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {BookListService} from "../../../services/book/book-list.service";
import {log} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private book: Book
  private selectedBook: Book
  private booksList: Book[]

  constructor(private bookService: BookListService,
              private router: Router) { }



  ngOnInit() {
    this.refresh()
  }

  refresh() {
    console.log('pre')
    this.bookService.getBookListBest6().subscribe(

      res => {
        console.log('read')
        this.booksList = res

      },
      error => {
        console.log(error)
      }
    )



  }

  onSelect(book:Book) {
    this.selectedBook = book

    this.router.navigate(['book' , book.id])
  }




}
