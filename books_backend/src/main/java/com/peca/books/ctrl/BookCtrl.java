package com.peca.books.ctrl;

import com.peca.books.model.Book;
import com.peca.books.model.dto.cart.CartReqDto;
import com.peca.books.model.dto.discount.DiscountReqDto;
import com.peca.books.model.dto.search.SearchReqDto;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/book")
public class BookCtrl {

    @Autowired
    BookService bookService;

    @PostMapping(path = "/add")
    public Book addBookPost (@RequestBody Book book){
        return bookService.save(book);
    }

    @GetMapping(path = "/all")
    public List<Book> getAll () {
        return bookService.findAll();
    }

    @GetMapping( path = "/{id}")
    public Book getBookById(@PathVariable Long id) {

        Book b = bookService.findOne(id);
        return b;

    }

    @GetMapping(path = "/best")
    public List<Book> getFeatured () {
        return bookService.findTopSold();
    }

    @GetMapping(path = "/price/{min}&{max}&{cat}&{type}&{lang}")
    public List<Book> getByPrice(@PathVariable int min, @PathVariable int max, @PathVariable String cat,
                                 @PathVariable String type, @PathVariable String lang) {
        return bookService.findBetweenPrice(min, max, cat, type, lang);
    }


    @PostMapping(path = "/sort&filter")
    public List<Book> getAllSorted(@RequestBody SearchReqDto searchDto){
        System.out.println("USA0");
        return bookService.pagination(searchDto.getOffset(),searchDto.getLimit(),searchDto.getSort(), searchDto.getOrder(), searchDto);
    }

    @PutMapping( path = "/update")
    public Book updateBook(@RequestBody Book book) {
        return bookService.save(book);

    }

    @DeleteMapping( path = "/remove/{id}")
    public void updateBook(@PathVariable Long id) {

        bookService.removeOne(id);
        System.out.println(id);
    }

    @PostMapping(path = "/size")
    public int numOfBook(@RequestBody SearchReqDto searchDto) {
        return  bookService.numberOfBooks(searchDto);
    }

    @PutMapping( path = "/sell")
    public void sellBook(@RequestBody CartReqDto cart) {
        bookService.sellBook(cart);
    }

    

    @GetMapping(path = "/search")
    public List<Book> search(@RequestParam String str) {
        return bookService.blurrySearch(str);
    }

    @PutMapping(path = "/discount")
    public void setDiscount(@RequestBody DiscountReqDto discount) {
        bookService.setDiscount(discount);
    }
}
