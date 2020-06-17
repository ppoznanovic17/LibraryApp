package com.peca.books.dao;

import com.peca.books.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookDao extends JpaRepository<Book, Long> {

    void deleteById(Long id);

    //ako sadrzi string u titlu ili autoru
    List<Book> findByTitleContainingOrAuthorContaining(String title, String author);
    // ako je autor ili naziv isti
    List<Book> findByTitleOrAuthor(String title, String author);

    //NAJPOPULARNIJE ako po broju prodatih opadajuce (po popularnosti)
    List<Book> findAllByOrderByNumberOfSoldDesc();


    // po ceni
    List<Book> findAllByOrderByOurPrice();
    List<Book> findAllByOrderByOurPriceDesc();

    // po broju strana
    List<Book> findAllByOrderByNumberOfPages();
    List<Book> findAllByOrderByNumberOfPagesDesc();

    //po nazivu
    List<Book> findAllByOrderByTitle();
    List<Book> findAllByOrderByTitleDesc();

    //sa svim filterima
    List<Book> findAllByOurPriceIsBetweenAndCategoryAndFormatAndLanguageOrderByOurPriceDesc(double ourPrice, double ourPrice2, String category, String format, String language);

    Optional<Book> findById(long id);


}
