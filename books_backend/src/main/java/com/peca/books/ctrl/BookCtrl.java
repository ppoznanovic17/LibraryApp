package com.peca.books.ctrl;

import com.peca.books.domain.Book;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Iterator;
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
