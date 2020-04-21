import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {BookService} from "../../../services/book/book.service";
import {Router} from "@angular/router";
import {GetBookService} from "../../../services/book/get-book.service";

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook: Book = new Book()
  private bookAdded: boolean
  private isValid: String

  constructor(private bookService:BookService,
              private router:Router

              ) { }

  ngOnInit() {

    this.bookAdded = false
    this.newBook.active = true
    this.newBook.category = ''
    this.newBook.format = ''
    this.newBook.language = ''
    this.newBook.title = ''
  }

  onSubmit() {

    if(this.newBook.title.length > 1 && this.newBook.author.length > 1 && this.newBook.publisher.length > 1 &&
                  this.newBook.category!= null && this.newBook.format!=null && this.newBook.isbn.length > 1 && this.newBook.description.length > 1
                  && this.newBook.inStockNumber !=null
                  ) {

      this.bookService.sendBook(this.newBook).subscribe(
        res => {
          this.bookAdded = true
          this.newBook = new Book()
          console.log(res)
        }, error => {
          console.log(error)
        }
      )

      this.router.navigate(['admin/booklist'])

    }else{
        this.isValid = 'Please enter all requested values!'
    }


  }

}
