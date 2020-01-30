import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {GetBookService} from "../../../services/book/get-book.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private book: Book = new Book()

  private bookId: number



  constructor(private getBookService: GetBookService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id'])

      console.log(this.bookId)



    })
    console.log(typeof this.bookId)
    this.loadBook(this.bookId)


  }

  loadBook (bookId:number) {

    this.getBookService.getBook(bookId).subscribe(
      res => {
        this.book = res
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )

  }

  openEdit () {
    this.router.navigate(['admin/book/edit' , this.bookId])
  }






}
