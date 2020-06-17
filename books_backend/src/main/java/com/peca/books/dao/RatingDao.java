package com.peca.books.dao;

import com.peca.books.model.Rating;
import com.peca.books.model.dto.rating.RatingResDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingDao extends JpaRepository<Rating, Long> {


    RatingResDto findAllById(Long id);

    List<Rating> findAll();

    List<Rating> findAllByUserId(long id);

    List<Rating> findAllByBookId(long id);

    void deleteById(Long id);
}
