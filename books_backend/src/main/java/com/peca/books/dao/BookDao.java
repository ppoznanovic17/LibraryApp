package com.peca.books.dao;

import com.peca.books.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookDao extends JpaRepository<Book, Long> {

    void deleteById(Long id);

    List<Book> findByTitleContaining(String title);



}
