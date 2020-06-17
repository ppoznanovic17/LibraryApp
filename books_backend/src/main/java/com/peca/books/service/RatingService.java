package com.peca.books.service;

import com.peca.books.model.Rating;
import com.peca.books.model.dto.rating.RatingResDto;

import java.util.List;

public interface RatingService {

    RatingResDto save(Rating r);

    void delete(Long id);

    List<RatingResDto> findAllByUserId(long id);

    List<RatingResDto> findAllByBookId(long id);

    boolean isUsersRating(long userId, long ratingId);

    boolean userRatedBook(long userId, long bookId);

}
