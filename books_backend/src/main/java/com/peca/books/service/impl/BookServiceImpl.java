package com.peca.books.service.impl;

import com.peca.books.dao.BookDao;
import com.peca.books.model.Book;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
    public List<Book> findTopSold() {
        List<Book> bookList = bookDao.findAllByOrderByNumberOfSoldDesc();
        return bookList.subList(0,6);

    }

    @Override
    public List<Book> findAllPopularity() {
        return bookDao.findAllByOrderByNumberOfSoldDesc();
    }

    @Override
    public List<Book> findAllByPriceDesc() {
        return bookDao.findAllByOrderByOurPriceDesc();
    }

    @Override
    public List<Book> findAllByPrice() {
        return bookDao.findAllByOrderByOurPrice();
    }

    @Override
    public List<Book> findAllNumOfPagesDesc() {
        return bookDao.findAllByOrderByNumberOfPagesDesc();
    }

    @Override
    public List<Book> findAllNumOfPages() {
        return bookDao.findAllByOrderByNumberOfPages();
    }

    @Override
    public List<Book> findAllTitleDesc() {
        return bookDao.findAllByOrderByTitleDesc();
    }

    @Override
    public List<Book> findAllTitle() {
        return bookDao.findAllByOrderByTitle();
    }

    @Override
    public List<Book> findBetweenPrice(double ourPrice, double ourPrice2, String category, String format, String language) {
        return bookDao.findAllByOurPriceIsBetweenAndCategoryAndFormatAndLanguageOrderByOurPriceDesc
                (ourPrice, ourPrice2, category, format, language);
    }

    @Override
    public List<Book> pagination(int offset, int limit, String sort, int order) {
        int first = (offset-1) * limit;
        int last = offset*limit;
        int size = bookDao.findAll().size();
        if(limit*offset >= size){
            last = size-1;
        }

        if(first >= size){
            return new ArrayList<>();
        }

        if(sort.equals("price")){
            if(order == 1){
                return bookDao.findAllByOrderByOurPrice().subList(first, last);
            }else {
                return bookDao.findAllByOrderByOurPriceDesc().subList(first, last);
            }


        }else if(sort.equals("page")){
            if(order == 1){
                return bookDao.findAllByOrderByNumberOfPages().subList(first, last);
            }else {
                return bookDao.findAllByOrderByNumberOfPagesDesc().subList(first, last);
            }

        }else if(sort.equals("title")){
            if(order == 1){
                return bookDao.findAllByOrderByTitle().subList(first, last);
            }else {
                return bookDao.findAllByOrderByTitleDesc().subList(first, last);
            }

        }else{
            return bookDao.findAllByOrderByNumberOfSoldDesc().subList(first, last);
        }


    }

    @Override
    public List<Book> allSorted(String sort, int order) {
        if(sort.equals("price")){
            if(order == 1){
                return bookDao.findAllByOrderByOurPrice()   ;
            }else {
                return bookDao.findAllByOrderByOurPriceDesc();
            }


        }else if(sort.equals("page")){
            if(order == 1){
                return bookDao.findAllByOrderByNumberOfPages();
            }else {
                return bookDao.findAllByOrderByNumberOfPagesDesc();
            }

        }else if(sort.equals("title")){
            if(order == 1){
                return bookDao.findAllByOrderByTitle();
            }else {
                return bookDao.findAllByOrderByTitleDesc();
            }

        }else{
            return bookDao.findAllByOrderByNumberOfSoldDesc();
        }

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
    public List<Book> blurrySearch(String str) {
        List<Book> bookList = bookDao.findByTitleContainingOrAuthorContaining(str,str);

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
    public List<Book> fullSearch(String str) {
        return null;
    }

    @Override
    public void removeOne(Long id) {
            bookDao.deleteById(id);
    }
}
