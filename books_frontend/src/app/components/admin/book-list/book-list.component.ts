import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {BookListService} from "../../../services/book/book-list.service";
import {Router} from "@angular/router";
import {RemoveBookService} from "../../../services/book/remove-book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public i = 0

  private selectedBook: Book
  private checked: boolean
  private bookList: Book[]
  private allChecked: boolean
  private removeBookList: Book[] = new Array()

  private toDelete = false

  constructor(
    private bookListService: BookListService,
    private router: Router,

    private removeBookService: RemoveBookService
  ) { }

  onSelect(book:Book) {
    this.selectedBook = book

    this.router.navigate(['admin/book' , book.id])
  }

  openDialog (book:Book) {

    let div = <HTMLSelectElement> document.getElementById(book.id + 'div')
    let btn = <HTMLSelectElement> document.getElementById(book.id + '')

    btn.style.display = 'none'
    div.style.display = 'block'

  }

  closeDialog(book:Book) {

    let div = <HTMLSelectElement> document.getElementById(book.id + 'div')
    let btn = <HTMLSelectElement> document.getElementById(book.id + '')

    btn.style.display = 'block'
    div.style.display = 'none'

  }

  delete(book:Book) {
      this.removeBookService.deleteBook(book.id).subscribe(
        res => {
          console.log('uspesno obrisano')
          this.refresh()
        }, error => {
          console.log(error)
        }
      )

  }

  refresh () {
    this.bookListService.getBookList().subscribe(
      res => {
        console.log(res)
        this.bookList = res
      },
      error => {
        console.log(error)
      }
    )
  }


  ngOnInit() {
    this.refresh()
  }

}

