import { Component, OnInit } from '@angular/core';
import { noUiSlider }  from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import {BookListService} from "../../../services/book/book-list.service";
import {Book} from "../../../models/book";
import {Router} from "@angular/router";
import {min} from "rxjs/operators";
import {FilterSortBookService} from "../../../services/book/filter-sort-book.service";
@Component({
  selector: 'app-booklist-all',
  templateUrl: './booklist-all.component.html',
  styleUrls: ['./booklist-all.component.css']
})
export class BooklistAllComponent implements OnInit {

  private bookList: Book[] = new Array()



  // price
  priceMin = 0
  priceMax = 11000

  //format
  paperback = false
  hardcover = false

  //category
  management = false
  fiction = false
  engineering = false
  programming = false
  architecture = false
  //language

  serbian = false
  english = false

  numOfBooks = 0


  format = new Array()
  category = new Array()
  language = new Array()

  search = {}
  limit = 12
  off = 1
  order = 1
  sort = ''
  iteratorList = new Array()
  pagination = new Array()

  searchET = ''
  searchBool = false

  constructor(private bookListService: BookListService,
              private bookFilterSortService: FilterSortBookService,
              private router: Router) { }

  ngOnInit() {

    console.log('price min = ' + this.priceMin)
    console.log('price max = ' + this.priceMax)

    document.querySelectorAll('.check').forEach(item => {
      item.addEventListener('change', event =>
          this.filterSortEvent())
    })






    this.refresh()

  }


  refresh () {

    this.search = {
      minPrice: this.priceMin,
      maxPrice: this.priceMax,
      format: this.format,
      category: this.category,
      language: this.language,
      offset: this.off,
      limit: this.limit,
      sort: this.sort,
      order: this.order
    }

    this.bookFilterSortService.numOfBooks(this.search).subscribe(
      res =>{
        this.numOfBooks = res
        //console.log(res)
      }, error => {
        console.log(error)
      }
    )

    this.bookFilterSortService.filterSort(this.search).subscribe(
      res => {
        this.bookList = res
        let iterator = 1
        let helper = -1
        if(this.numOfBooks % this.limit == 0) helper = 0
        else helper = 1
        console.log(this.numOfBooks + "   " + this.limit)
        this.iteratorList = new Array()
        for(let i=1 ; i<= this.numOfBooks/this.limit + helper; i++) {

          this.iteratorList.push(iterator)
          //console.log(iterator)
          iterator++
        }
        this.pagination = new Array()
        this.pagination = this.paginationButtons()


       /* console.log(this.bookList)
        console.log(res)*/
      }, error => {
        console.log(error)
      }
    )





  }

  filterSortEvent() {
    {
      let helperForPrice = (<HTMLSelectElement>document.getElementById('slct')).value
      this.selectPriceRange(parseInt(helperForPrice))



      let helperForLimit = (<HTMLSelectElement>document.getElementById('numOfBook')).value

      this.limit = (parseInt(helperForLimit))
      this.off = 1


      this.searchET = ''

      let sort = (<HTMLSelectElement>document.getElementById('sort')).value

      if(sort == '1'){
        this.sort = 'pop'
        this.order = 1
      }
      if(sort == '2'){
        this.sort = 'price'
        this.order = 1
      }
      if(sort == '3'){
        this.sort = 'price'
        this.order = 0
      }
      if(sort == '4'){
        this.sort = 'page'
        this.order = 1
      }
      if(sort == '5'){
        this.sort = 'page'
        this.order = 0
      }
      if(sort == '6'){
        this.sort = 'title'
        this.order = 1
      }
      if(sort == '7'){
        this.sort = 'title'
        this.order = 0
      }



      this.searchBool = false

      //console.log('desilo se')
      if(this.paperback == false && this.hardcover == false){
        this.format = null
      }else{
        this.format = new Array()
        if(this.paperback) this.format.push('paperback')
        if(this.hardcover) this.format.push('hardcover')
      }

      if(this.management == false && this.fiction == false && this.engineering == false && this.programming == false && this.architecture == false){
        this.category = null
      }else{
        this.category = new Array()
        if(this.management) this.category.push('management')
        if(this.fiction) this.category.push('fiction')
        if(this.engineering) this.category.push('engineering')
        if(this.programming) this.category.push('programming')
        if(this.architecture) this.category.push('architecture')
      }

      if(this.serbian == false && this.english == false){
        this.language = null
      }else{
        this.language = new Array()
        if(this.serbian) this.language.push('serbian')
        if(this.english) this.language.push('english')
      }


      this.refresh()


    }
  }

  getBackgroundColor(category) {
    if(category == 'management') return 'red'

    if(category == 'programming') return 'orange'

    if(category == 'fiction') return 'green'

    if( category == 'engineering') return 'blue'

    if(category == 'architecture') return 'black'
  }

  onSelect(book:Book) {
    this.router.navigate(['book' , book.id])
  }

  selectPriceRange(value: number) {
    //console.log(event.target.value)
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
      this.priceMax = 11000
    }
   /* console.log('price min = ' + this.priceMin)
    console.log('price max = ' + this.priceMax)*/
  }

  cropTitle(title: String){
    if(title.length > 41){
      return title.slice(0, 39) + '...'
    }
    return title
  }

  paginationButtons(){
    let pages = new Array()
    if(this.searchBool == true){
      return new Array()
    }
    for(let i = 1; i <= this.iteratorList.length; i++){

      if (this.off == 1){
        if(Math.abs(i -this.off) <=4){
          pages.push(i)
          console.log(1)
        }

      }else if(this.off == 2) {
        if(Math.abs(i -this.off) <=3){
          pages.push(i)
          console.log(2)
            }
      }else if(this.off == this.iteratorList.length) {
        if(Math.abs(i -this.off) <=4){
          pages.push(i)
          console.log('poslednji')}
      }else if(this.off == this.iteratorList.length-1) {
        if(Math.abs(i -this.off) <=3){
          pages.push(i)
          console.log('pretposlednji')
        }
      }else{
       if (Math.abs(i -this.off) <=2){
          console.log('add')
         pages.push(i)
       }
        }

    }
    console.log(pages.length)
    return pages
  }

  goLeft(){
    if(this.off == 1)
      return
    this.off--
    this.refresh()
  }

  goRight(){
    if(this.off == this.iteratorList.length)
      return
    this.off++
    this.refresh()
  }

  goPage(page){
    this.off = page
    this.refresh()
  }

  calcLast(){
    if(this.numOfBooks < this.limit*this.off){
      return this.numOfBooks
    }
    if(this.searchBool) return this.numOfBooks
    return this.limit * this.off
  }

  searchByTitleOrTitle(){

      this.bookListService.searchBook(this.searchET).subscribe(
        res =>{
          this.bookList = res
          this.order = 0
          this.sort = 'pop'
          this.paperback = false
          this.hardcover = false
          this.management = false
          this. fiction = false
          this.engineering = false
          this.programming = false
          this.architecture = false
          this.english = false
          this.english = false
          this.limit = 12
          this.off = 1
          this.searchBool = true
          this.numOfBooks = this.bookList.length
        }, error => {

        }
      )
  }

  haveDiscount(book:Book) {
    if(book.discount == 0) return false
    return true
  }


}
