package com.peca.books.service.impl;

import com.peca.books.dao.BookDao;
import com.peca.books.domain.Book;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookDao bookDao;

    @Override
    public List<Book> findAll() {
        List<Book> bookList = bookDao.findAll();

        List<Book> activeBookList = new ArrayList<>();

        for( Book b : bookList){
            if(b instanceof Book){
                if( b.isActive()){
                    activeBookList.add(b);
                }
            }
        }
        return activeBookList;
    }

    @Override
    public Book findOne(Long id) {
        return bookDao.getOne(id);
    }

    @Override
    public Book save(Book book) {
        return bookDao.save(book);
    }

    @Override
    public List<Book> blurrySearch(String title) {
        List<Book> bookList = bookDao.findByTitleContaining(title);

        List<Book> activeBookList = new ArrayList<>();

        for( Book b : bookList){
            if(b instanceof Book){
                if( b.isActive()){
                    activeBookList.add(b);
                }
            }
        }
        return activeBookList;
    }

    @Override
    public void removeOne(Long id) {
            bookDao.deleteById(id);
    }
}
