package com.peca.books.ctrl;

import com.peca.books.model.Book;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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

    @GetMapping(path = "/sort/{off}&{limit}&{sort}&{order}")
    public List<Book> getAllSorted(@PathVariable int off, @PathVariable int limit,
                                   @PathVariable String sort, @PathVariable int order){

        return bookService.pagination(off,limit,sort,order);
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
}
