import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {BookService} from "../../../services/book/book.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GetBookService} from "../../../services/book/get-book.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  private book: Book = new Book()
  private bookId: number
  private bookUpdated: boolean

  private isValid: String

  constructor(private bookService:BookService,
              private router:Router,
              private getBookService: GetBookService,
              private route: ActivatedRoute
  ) { }



  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id'])
    })

    this.getBookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res
      },
      error => {
        console.log(error)
      }
    )

  }

  onSubmit() {

    if(this.book.title.length > 1 && this.book.author.length > 1 && this.book.publisher.length > 1 &&
      this.book.category!= null && this.book.format!=null && this.book.isbn.length > 1 && this.book.description.length > 1
    ) {

      this.bookService.updateBook(this.book).subscribe(
        res => {
          this.bookUpdated = true
          this.router.navigate(['/admin/book', this.book.id])
          console.log(res)
        }, error => {
          console.log(error)
        }
      )



    }else{
      this.isValid = 'Please enter all requested values!'
    }


  }

}
