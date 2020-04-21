import { Component, OnInit } from '@angular/core';
import { noUiSlider }  from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import {BookListService} from "../../../services/book/book-list.service";
import {Book} from "../../../models/book";
import {Router} from "@angular/router";
@Component({
  selector: 'app-booklist-all',
  templateUrl: './booklist-all.component.html',
  styleUrls: ['./booklist-all.component.css']
})
export class BooklistAllComponent implements OnInit {

  private bookList: Book[] = new Array()



  // price
  priceMin = 0
  priceMax = 5000

  //format
  paperback = false
  hardcover = false
  formatAll = true

  //category
  management = false
  fiction = false
  engineering = false
  programming = false
  artsLiterature = false
  categoryAll = true
  //language

  serbian = false
  english = false
  languageAll = true



  constructor(private bookListService: BookListService,
              private router: Router) { }

  ngOnInit() {
    this.refresh()
    console.log('price min = ' + this.priceMin)
    console.log('price max = ' + this.priceMax)
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

  onSelect(book:Book) {
    this.router.navigate(['book' , book.id])
  }

  selectPriceRange(event: any) {
    //console.log(event.target.value)
    let value = event.target.value
    if(value == 1){
      this.priceMin = 0
      this.priceMax = 500

    }else if (value ==2){
      this.priceMin = 501
      this.priceMax = 1000

    }else if (value == 3){
      this.priceMin = 1001
      this.priceMax = 1500

    }else if (value == 4){
      this.priceMin = 1501
      this.priceMax = 2000

    }else if (value == 5){
      this.priceMin = 2001
      this.priceMax = 3000

    }else if (value == 6){
      this.priceMin = 3001
      this.priceMax = 5000

    }else {
      this.priceMin = 0
      this.priceMax = 5000
    }
    console.log('price min = ' + this.priceMin)
    console.log('price max = ' + this.priceMax)
  }

  changeFormat (format: string) {
    console.log(this.paperback)
  }

  changeCategory (cat: string) {

  }


}
