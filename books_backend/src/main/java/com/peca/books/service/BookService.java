package com.peca.books.service;

import com.peca.books.model.Book;

import java.util.List;

public interface BookService {

    List<Book> findAll();
    Book findOne(Long id);
    Book save (Book book);
    void removeOne(Long id);

    List<Book> blurrySearch(String str);
    List<Book> fullSearch(String str);

    List<Book> findTopSold();
    List<Book> findAllPopularity();

    List<Book> findAllByPriceDesc();
    List<Book> findAllByPrice();

    List<Book> findAllNumOfPagesDesc();
    List<Book> findAllNumOfPages();

    List<Book> findAllTitleDesc();
    List<Book> findAllTitle();

    List<Book> findBetweenPrice(double ourPrice, double ourPrice2, String category, String format, String language);

    List<Book> pagination(int offset, int limit, String sort, int order);
    List<Book> allSorted(String sort, int order);
}
