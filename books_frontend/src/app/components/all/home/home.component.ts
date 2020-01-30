import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {BookListService} from "../../../services/book/book-list.service";
import {log} from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private book: Book

  private booksList: Book[]

  constructor(private bookService: BookListService) { }



  ngOnInit() {
    this.refresh()
  }

  refresh() {
    console.log('pre')
    this.bookService.getBookList().subscribe(

      res => {
        console.log('read')
        this.booksList = res

      },
      error => {
        console.log(error)
      }
    )



  }




}
